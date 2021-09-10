
const apiUrl = 'https://owsnews.herokuapp.com/covid?fbclid=IwAR2NUuX2nrVl87DEyGUhb1DTdCcJW8cvi2xQbNnmN29SZgtuXMmsbO2Hzik/data'

function fetchData(){
    fetch(apiUrl)
        .then(function (response){
            return response.json()
        })
        .then(function (data){
            const dulieu = data['data']
            const nguon = data['source_covid']

            const htmls = dulieu.map(item =>{
                return `<ul id="data-list"> <h3>${item.tinh}</h3> 
                            <li>Ca nhiễm trong ngày: ${item.nhiem}</li>
                            <li>Ca tử vong trong ngày: ${item.tuvong}</li>
                            <li>Tổng ca nhiễm: ${item.tong_nhiem}</li>
                            <li>Tổng ca tử vong: ${item.tong_tuvong}</li>
                        </ul>`
            })

            const htmlData = htmls.join('')

            document.getElementById('item-data').innerHTML = htmlData
            document.getElementById('item-source').innerHTML = nguon
            
        })

 
}

function test(){
    alert('hello')
}

fetchData()
