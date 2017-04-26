import {createUserPosition, IUserPosition} from './user';

export interface ICouncilInst {
    readonly id: number,
    councilId: number,
    year: number,
    positions: ICouncilPosition[]
}

export function createCouncilInstance({ id, councilId, year, CouncilPositions }: any): ICouncilInst {
    return {
        id,
        councilId,
        year,
        positions: CouncilPositions.map(createCouncilPosition)
    }
}

export interface ICouncilPosition {
    readonly id: number,
    councilInstanceId: number,
    year: number,
    phd: boolean,
    vacant: boolean
    UserPosition: IUserPosition
}

export function createCouncilPosition({ id, councilInstanceId, year, phd, vacant, UserPosition }: any): ICouncilPosition {
    if (UserPosition) {
        return {
            id,
            councilInstanceId,
            year,
            phd,
            vacant,
            UserPosition: createUserPosition(UserPosition)
        }
    }else {
        return {
            id,
            councilInstanceId,
            year,
            phd,
            vacant,
            UserPosition: null
        }
    }
}