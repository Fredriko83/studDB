export interface Iemployee {
    readonly id: number,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    facultyId: number,
    profileUrl: string,
    password: string
}

export function createEmployee({
    id,
    firstName,
    lastName,
    phone,
    email,
    facultyId,
    profileUrl,
    password}: any): Iemployee {
    return {
        id,
        firstName,
        lastName,
        phone,
        email,
        facultyId,
        profileUrl,
        password
    };
}

export function createEmployees(data: any[]): Iemployee[] {
    return data.map(createEmployee);
}

export interface IEmployeePosition {
    readonly EmployeeId: number,
    readonly CouncilId: number,
    secretary: boolean,
    chairman: boolean,
    convener: boolean
}

export function createEmployeePosition({EmployeeId, CouncilId, secretary, chairman, convener} : any) : IEmployeePosition {
    return {
        EmployeeId,
        CouncilId,
        secretary,
        chairman,
        convener
    };
}
