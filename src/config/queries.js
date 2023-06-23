export const CREATE_TABLE_BTC_VALUE = `
  create table if not exists btc_value (
    id integer primary key,
    read_time text not null,
    price real not null
  )
`

/**
 * Escreva esta consulta
 */
export const INSERT_BTC_READ = `
    insert or ignore into btc_value values (?, ?, ?)
`

/**
 * Escreva esta consulta
 */
export const SELECT_AVG_PRICE = `
    select avg(price) from btc_value
`

export const SELECT_ID = `
    select * from btc_value order by id desc limit 1;  
`
export const drop_table = `
    drop table btc_value
`