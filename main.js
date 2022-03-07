
const apiUrl = 'https://owsnews.herokuapp.com/covid?fbclid=IwAR2NUuX2nrVl87DEyGUhb1DTdCcJW8cvi2xQbNnmN29SZgtuXMmsbO2Hzik/data'

function fetchData(){
    fetch(apiUrl)
        .then(function (response){
            // Check response after fetching url
            if(!response.ok){
                document.getElementById('item-source').innerHTML = "Lỗi khi tải dữ liệu vui lòng thử lại!"
            }
            return response.json()
        })
        .then(function (data){

            // Nguồn: Bộ y tế.....
            const nguon = data['source_covid']
            document.getElementById('item-source').innerHTML = nguon


            // Data: tinh, ca nhiem, ca tu vong, ...
            const dulieu = data['data']
            dulieu.sort((i,j) => {
                var striTong = i.nhiem
                var strjTong = j.nhiem

                // replace . in string and parse into integer
                // ex: "14.576" => "14576" => 14576
                var iTong = parseInt(striTong.replace('.',''))
                var jTong = parseInt(strjTong.replace('.',''))

                return jTong - iTong
            })
            const html = dulieu.map(item =>{
                var index = dulieu.findIndex(i => i.tinh == item.tinh)
                index++

                return `<ul id="data-list"> <h3> ${index}. ${item.tinh}</h3> 
                            <li>Ca nhiễm trong ngày: ${item.nhiem}</li>
                            <li>Ca tử vong trong ngày: ${item.tuvong}</li>
                            <li>Tổng ca nhiễm: ${item.tong_nhiem}</li>
                            <li>Tổng ca tử vong: ${item.tong_tuvong}</li>
                        </ul>`
            }).join('')
            document.getElementById('item-data').innerHTML = html


            // total death
            var totalDeath = 0
            for(var item of dulieu){
                var str = item.tong_tuvong
                var val = parseInt(str.replace('.',''))
                totalDeath += val
            }
            document.getElementById('total-death').innerHTML = `<h3>Tổng ca tử vong toàn quốc: </h3> ${totalDeath}`

            // total death in day
            var totalDeathInDay = 0
            for(var item of dulieu){
                var str = item.tuvong
                var val = parseInt(str.replace('.',''))
                totalDeathInDay += val
            }
            document.getElementById('total-death-inday').innerHTML = `<h3>Tổng ca tử vong toàn quốc trong ngày: </h3>${totalDeathInDay}`

            // total infected
            var totalInfected = 0
            for(var item of dulieu){
                var str = item.tong_nhiem
                var val = parseInt(str.replace('.',''))
                totalInfected += val
            }
            document.getElementById('total-infected').innerHTML = `<h3>Tổng ca nhiễm toàn quốc: </h3>${totalInfected}`
            
            // total infected in day
            var totalInfectedInDay = 0
            for(var item of dulieu){
                var str = item.nhiem
                var val = parseInt(str.replace('.',''))
                totalInfectedInDay += val
            }
            document.getElementById('total-infected-inday').innerHTML = `<h3>Tổng ca nhiễm trong ngày toàn quốc: </h3>${totalInfectedInDay}`
            
        })
}
fetchData()

function test(){
    alert('test')
}
