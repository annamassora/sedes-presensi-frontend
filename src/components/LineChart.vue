<template>
  <div class="lineChart">
    <div class="chartAndButtonsContainer">
      <form action="" id="stockSymbolSearchForm" @submit.prevent="createAttendanceDateHistoryRangeSETUP(15768000000000000)">
        <input name="stockSymbolSearch" type="text" placeholder="enter the symbol of the stock you want to search" id="stockSymbolSearchBar" v-model="stockSymbol">
        <button type="submit" class="submit">Search</button>
      </form>
      <br>
      <p>Active Stock Symbol: {{ stockSymbol }}</p>
      <br>
      <div class="dateRangeButtons">
        <button @click="createAttendanceDateHistoryRangeSETUP(86400)">1 day</button>
        <button @click="createAttendanceDateHistoryRangeSETUP(604800)">1 week</button>
        <button @click="createAttendanceDateHistoryRangeSETUP(2630000)">1 month</button>
        <button @click="createAttendanceDateHistoryRangeSETUP(31536000)">1 year</button>
        <button @click="createAttendanceDateHistoryRangeSETUP(157680000)">5 years</button>
        <button @click="createAttendanceDateHistoryRangeSETUP(10000000000000000)">MAX</button>
      </div>

      <div id="chartContainer">
        <canvas id="myChart" width="400px" height="400px"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios'
let stockMarketHistory = [];
let stockMarketHistoryDates = [];
let stockMarketHistoryEpochDates = [];
let stockMarketHistoryPrices = [];
let myChart;
myChart;
export default {
  name: 'LineChart',
  mounted() {
    // beginning of stock API code
    let stockSymbol = 'IBM';
    let AlphaVantangeAPI_URL_Link = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${stockSymbol}&apikey=6S3XWKYVUZIUJZEF`;
    let createAttendanceSpecifiedDateHistoryRangeSETUP = (dateRange) => {
      axios.get(AlphaVantangeAPI_URL_Link)
        .then(response => {
          stockMarketHistory = response
          console.log('response', response)
          for (const property in stockMarketHistory.data["Monthly Adjusted Time Series"]) {
            //[1999],[12],[31]
            let closingPrice = stockMarketHistory.data["Monthly Adjusted Time Series"][property]["4. close"];
            let closingDateMonth = property.split('-')[1];
            let closingDateYear = property.split('-')[0];
            let closingDateDay = property.split('-')[2];
            let closingDateProperlyFormatted = `${closingDateMonth}/${closingDateDay}/${closingDateYear}`;
            let closingDateEpochTime = Date.parse(closingDateProperlyFormatted)/1000;
            dateRange;
            closingDateProperlyFormatted
            closingPrice
            closingDateEpochTime
            stockMarketHistoryDates.unshift(closingDateProperlyFormatted)
            stockMarketHistoryEpochDates.unshift(closingDateEpochTime)
            stockMarketHistoryPrices.unshift(closingPrice)
          }
        })
        .then(() => {
          let now = Date.now()/1000;
          let dateRangeDate = now - dateRange;
          const isLaterDateThanDateRangeDate = (date) => {
            return date > dateRangeDate;
          }
          
          let arrayIndexWhereDateIsLargerThanDateRangeDate = stockMarketHistoryEpochDates.findIndex(isLaterDateThanDateRangeDate);
          stockMarketHistoryDates.splice(0, arrayIndexWhereDateIsLargerThanDateRangeDate);
          stockMarketHistoryPrices.splice(0, arrayIndexWhereDateIsLargerThanDateRangeDate);
          this.updateAttendanceHistoryChart();
        });
    }
    // end of stock API code
    createAttendanceSpecifiedDateHistoryRangeSETUP(23456345634563463465436);
  },
  setup() {
    let updateAttendanceHistoryChart = () => {
      // beginning of line chart code //
      const ctx = document.getElementById('myChart');
      const labels = stockMarketHistoryDates;
      const data = {
        labels: labels,
        datasets: [{
          label: 'My First Dataset',
          data: stockMarketHistoryPrices,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0,
          options: {
            responsive:true,
            maintainAspectRatio: false,
          }
        }]
      };
      let myChart = null;
  
      const chartWithKey = Chart.getChart('myChart');
      if (chartWithKey != undefined) {
        chartWithKey.destroy();
      }
      myChart = new Chart(ctx, {
        type: 'line',
        data: data,
      });
      myChart;
    }
    // beginning of stock API code
    let stockSymbol = ref('AMZN');
    let AlphaVantangeAPI_URL_Link = computed(() => 
      'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=' + stockSymbol.value + '&apikey=6S3XWKYVUZIUJZEF'
    ); 
    let createAttendanceDateHistoryRangeSETUP = (dateRange) => {
      console.log('selected stock symbol: ' + stockSymbol.value);
      // empty array if something already in there
      if (stockMarketHistoryDates.length > 0) {
        stockMarketHistoryDates = [];
        stockMarketHistoryEpochDates = [];
        stockMarketHistoryPrices = [];
      }
      console.log(AlphaVantangeAPI_URL_Link.value);
      axios.get(AlphaVantangeAPI_URL_Link.value)
        .then(response => {
          stockMarketHistory = response
          for (const property in stockMarketHistory.data["Monthly Adjusted Time Series"]) {
            let closingPrice = stockMarketHistory.data["Monthly Adjusted Time Series"][property]["4. close"];
            let closingDateMonth = property.split('-')[1];
            let closingDateYear = property.split('-')[0];
            let closingDateDay = property.split('-')[2];
            let closingDateProperlyFormatted = `${closingDateMonth}/${closingDateDay}/${closingDateYear}`;
            let closingDateEpochTime = Date.parse(closingDateProperlyFormatted)/1000;
            dateRange;
            closingDateProperlyFormatted
            closingPrice
            closingDateEpochTime
            stockMarketHistoryDates.unshift(closingDateProperlyFormatted)
            stockMarketHistoryEpochDates.unshift(closingDateEpochTime)
            stockMarketHistoryPrices.unshift(closingPrice)
          }
        })
        .then(() => {
          console.log(dateRange);
          let now = Date.now()/1000;
          console.log('Now: ' + now + '\n5 years ago: ' + (now - dateRange));
          let dateRangeDate = now - dateRange;
          console.log('dateRangeDate: ' + dateRangeDate);
          const isLaterDateThanDateRangeDate = (date) => {
            return date > dateRangeDate;
          }
          let arrayIndexWhereDateIsLargerThanDateRangeDate = stockMarketHistoryEpochDates.findIndex(isLaterDateThanDateRangeDate);
          console.log(arrayIndexWhereDateIsLargerThanDateRangeDate);
          stockMarketHistoryDates.splice(0, arrayIndexWhereDateIsLargerThanDateRangeDate);
          stockMarketHistoryPrices.splice(0, arrayIndexWhereDateIsLargerThanDateRangeDate);
          console.log(stockMarketHistoryDates);
          updateAttendanceHistoryChart();
          console.log('In setup');
          console.log('In setup: ' + myChart);
          console.log(window.myChart);
        });
    }
    // end of stock API code
    return {
      createAttendanceDateHistoryRangeSETUP,
      updateAttendanceHistoryChart,
      stockSymbol,
      AlphaVantangeAPI_URL_Link,
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#chartContainer {
  width: 1000px;
  height: 300px;
  margin: 0 auto;
}
#stockSymbolSearchBar {
  padding: 10px;
}
#stockSymbolSearchForm .submit {
  padding: 10px 20px;
}
.dateRangeButtons button {
  padding: 10px 20px;
  margin: 2px;
}
</style>