import { CREATE_TABLE_BTC_VALUE, INSERT_BTC_READ, SELECT_AVG_PRICE, SELECT_ID, drop_table } from './config/queries.js';
import { openDB } from './config/db.js';
import { coinEmitter } from './emitters/coin_emitter.js'

console.log('Iniciando leituras...')
/**
 * Formatador capaz de formatar um número
 * no padrão de moeda brasileiro.
 */
const moneyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'usd',
})

/**
 * Listener que é acionado toda vez que
 * o coin emitter emite o preço atual
 * do Bitcoin.
 */
coinEmitter.on('btc_read', (price) => {
  const time = new Date().toISOString()
  const formattedPrice = moneyFormatter.format(price)
  console.log(`Preço do Bitcoin em ${time} -> U$ ${formattedPrice}`)

  /**
   * Abaixo, crie o código necessário para salvar
   * o novo preço lido do Bitcoin na tabela btc_value.
   * Após, crie o código necessário para executar uma
   * consulta na tabela btc_value que retorne o valor
   * médio do Bitcoin desde a primeira leitura.
   */

    
    ;(async () => {
      const db = await openDB()
      const result = await db.all(SELECT_ID)
      var id;
      if(result){
        id = Number(result)
      } else {
        id = 1;
      }
      await db.run(INSERT_BTC_READ, id, time, price)
      const avgResult = await db.get(SELECT_AVG_PRICE)
      const avg = avgResult['avg(price)']
      const formattedAvgPrice = moneyFormatter.format(Number(avg))
      console.log(`A média de preço do Bitcoin em ${time} -> ${formattedAvgPrice}`)


    })();

    
})

/**
 * Observação final:
 *
 * Implemente este script de tal forma que,
 * caso ele seja interrompido e posteriormente
 * executado novamente, não haja problemas
 * de conflito de chaves primárias na tabela
 * btc_value.
 */
