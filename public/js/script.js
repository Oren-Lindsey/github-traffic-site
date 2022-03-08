const nameInput = document.getElementById('nameInput')
const mainText = document.getElementById('mainText')
const mainLink = document.getElementById('mainLink')
const totalText = document.getElementById('total')
const errorText = document.getElementById('error')
const noteText = document.getElementById('note')
const searchBar = document.getElementById('form')
let timeout = null;
searchBar.addEventListener('submit', function (e) {
  e.preventDefault();
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    globalThis.repoChart.destroy();
    addChart(nameInput.value)
  }, 1000);
});
function addChart(repoName) {
  const repo = repoName
  fetch(`/api/views/${repo}`)
    .then(res => res.json())
    .then(data => {
      populatePage(data)
      errorText.innerText = ``
      mainText.innerText = `Traffic on repository Oren-Lindsey/${repo}:`
      mainLink.innerText = `View it on Github`
      mainLink.href = `https://github.com/Oren-Lindsey/${repo}`
      noteText.innerText = 'Note: This chart only shows timestamps that have data. All other days that are not on this chart have no views or they were not recorded. All data recorded at 7:00:00 PM by GitHub.'
    })
    .catch((error) => {
      errorText.innerText = `Error: That repository doesn't exist`
    });
}

function populatePage(viewsData) {
  let chartlabels = []
  let dataset = []
  let dataset2 = []
  for (let i = 0; i < viewsData.views.length; i++) {
    const sd = viewsData.views[i].timestamp.split('T')[0]
    chartlabels.push(sd)
  }
  for (let i = 0; i < viewsData.views.length; i++) {
    dataset.push(viewsData.views[i].count)
  }
  for (let i = 0; i < viewsData.views.length; i++) {
    dataset2.push(viewsData.views[i].uniques)
  }
  const labels = chartlabels
  
  const data = {
    labels: labels,
    datasets: [{
      label: 'Views',
      backgroundColor: '#ff8c00',
      borderColor: '#ff8c00',
      data: dataset,
    },
    {label: 'Unique views',
      backgroundColor: '#523169',
      borderColor: '#523169',
      data: dataset2,
    }]
  };
  
  const config = {
    type: 'line',
    data: data,
    options: {responsive: true}
  };
  globalThis.repoChart = new Chart(
    document.getElementById('repo-canvas'),
    config
  );
  totalText.innerText = `Total views: ${viewsData['count']}; Total unique views: ${viewsData['uniques']}`
}
async function main() {
  fetch('/api/default')
    .then(res => res.json())
    .then(data => {
      addChart(data.default)
    })
}
main()
