export interface BaseEntity {
    id: number,
    selected?: boolean,
}

export interface User extends BaseEntity {
    name: string,
    lastName: string,
    role: string,
}

export interface Chain extends BaseEntity {
    name: string,
    identification: string,
    userId: number,
}

export interface Store extends BaseEntity {
    name: string,
    city: string,
    chainId: number,
}

export interface Product extends BaseEntity {
    name: string,
    price: number,
    storeId: number,
}
