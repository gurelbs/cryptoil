import Head from 'next/head'
import CoinGecko from 'coingecko-api'

const CoinGeckoClient = new CoinGecko();
const priceFormat = x => new Intl.NumberFormat({ style: 'currency', currency: 'USD' }).format(x)
const formatPercentage = num => `${new Number(num).toFixed(3)}%`;

export default function Home(props) {
  const {data} = props.result;
  return (
    <div>
            <h1 class="display-4 text-center">קריפטו ישראל</h1>
    <div className="d-flex  bg-dark">
    <div className="container bg-dark table-responsive">
    <div className='justify-self-center'>
      <Head>
        <title>קריפטו ישראל</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <table className=" table table-fixed table-sm table-hover table-borderless table-dark">
        <thead className="thead-dark">
          <tr className="sticky">
            <th className="sticky-top px-3" scope="col">דירוג</th>
            <th className="sticky-top px-3" scope="col">סמל</th>
            <th className="sticky-top px-3" scope="col">מטבע</th>
            <th className="sticky-top px-3" scope="col">מחיר</th>
            <th className="sticky-top px-3" scope="col">שווי שוק</th>
            <th className="sticky-top px-3" scope="col">שינוי (24 שעות)</th>
            <th className="sticky-top px-3" scope="col">שער יומי גבוה</th>
            <th className="sticky-top px-3" scope="col">שער יומי נמוך</th>
          </tr>
        </thead>
        <tbody >
          {data.map(coin => (
            <tr key={coin.id}>
              <td className="font-weight-bold"> {coin.market_cap_rank}</td>
              <td className="font-weight-bold">
                <img src={coin.image}
                  style={{width: 25, height: 25, marginLeft: 10}} />
                {coin.symbol.toUpperCase()}
              </td>
              <td className='h4'>
                <p className='badge d-flex align-content-center'>
                {coin.name}
                </p>
                </td>
              <td className="h4"> ${priceFormat(coin.current_price)} </td>
              <td className="font-weight-bold"> ${priceFormat(coin.market_cap)} </td>
              <td style={{direction: 'ltr',textAlign: 'right'}}>
                <span className={coin.price_change_percentage_24h > 0 ? (
                  'font-weight-bold p text-success'
                ) : 'p text-danger' 
                }>
                  {formatPercentage(coin.price_change_percentage_24h)} 
                </span> 
              </td>
              <td> ${priceFormat(coin.high_24h)}</td>
              <td> ${priceFormat(coin.low_24h)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  </div>
  </div>
  )
}
export async function getServerSideProps(context){
  
  const params = {
    order: CoinGecko.ORDER.MARKET_CAP_DESC
  }
  const result = await CoinGeckoClient.coins.markets({params})
  return {
    props: {
      result
    }
  }
}