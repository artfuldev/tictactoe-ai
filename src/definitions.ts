export interface Cell extends Boolean {};
export interface Grid extends Array<Cell> {};
export interface Row extends Array<Cell> {};
export interface Column extends Array<Cell> {};
export interface Diagonal extends Array<Cell> {};
export interface Move extends Number {};
