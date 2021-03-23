import axios from "axios";
import { logger } from "@modules/log";
import {db} from "../../db";
import {validatorsCacheSet} from "@modules/cache/validators";
const VALIDATORS_URL = 'https://api.staketab.com/mina/get_providers';

const log = logger("FETCH_VALIDATORS");

const fixedData = {
    5: {fee: 5}, // Piconbello
    25: {priority: 1} // Carbonara
}
// Count how many priority bumps are there
const priorityOffset = Object.keys(fixedData).reduce((acc, curr) => fixedData[curr].priority ? acc + 1 : acc, 0)

export const fetchValidators = async () => {
    const { data } = await axios.get(
        VALIDATORS_URL
    );
    const validatorsRaw = data.staking_providers;

    const validators = validatorsRaw.map((v) => ({
        name: v.provider_title,
        fee: v.provider_fee,
        website: v.website,
        publicKey: v.provider_address,
        image: v.provider_logo,
        payoutTerms: v.payout_terms,
        stakePercent: v.stake_percent,
        stakedSum: v.staked_sum,
        twitter: v.twitter,
        telegram: v.telegram,
        github: v.github,
        email: v.email,
        discordUsername: v.discord_username,
        discordGroup: v.discord_group,
        delegatorsNum: v.delegators_num,
        providerId: v.provider_id,
        ...fixedData[v.provider_id]
    }))
    const sortedValidators = validators.sort((a, b) => b.stakePercent - a.stakePercent);
    const prioritizedValidators = sortedValidators.map((v, index) => ({
        ...v,
        priority: v.priority ? v.priority : index + 1 + priorityOffset
    }));

    try {
        await db('validators')
            .insert(prioritizedValidators)
            .onConflict('publicKey')
            .merge()
    } catch (e) {
        log.error('Failed to upsert validators ', e);
    }

    // create the cache
    const validatorsNameValue = validators.map((v) => ({
        name: v.name,
        publicKey: v.publicKey
    }))

    await validatorsCacheSet(validatorsNameValue);

    return
}
