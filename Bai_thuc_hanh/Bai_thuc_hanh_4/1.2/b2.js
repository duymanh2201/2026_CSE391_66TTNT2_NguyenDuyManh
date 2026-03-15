const nameip = document.getElementById("name");
const scoreip = document.getElementById("score");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");

const totalText = document.getElementById("total");
const avgText = document.getElementById("avg");

const searchInput = document.getElementById("searchInput");
const filterRank = document.getElementById("filterRank");
const sortScore = document.getElementById("sortScore");

let filteredStudents = [];
let sortAsc = true;

let students = [];

addBtn.addEventListener("click", addStudent);

scoreip.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        addStudent();
    }
});

function addStudent(){

    const name = nameip.value.trim();
    const score = parseFloat(scoreip.value);

    if(name === ""){
        alert("Họ tên không được để trống");
        return;
    }

    if(isNaN(score) || score < 0 || score > 10){
        alert("Điểm hợp lệ (0-10)");
        return;
    }

    students.push({
        name: name,
        score: score
    });

    applyFilters();

    nameip.value = "";
    scoreip.value = "";
}

function renderTable(){

    tableBody.innerHTML = "";

    let sum = 0;

    filteredStudents.forEach((sv, index) => {

        let rank = "";

        if(sv.score >= 8.5){
            rank = "Giỏi";
        }
        else if(sv.score >= 7){
            rank = "Khá";
        }
        else if(sv.score >= 5){
            rank = "Trung Bình";
        }
        else{
            rank = "Yếu";
        }

        const tr = document.createElement("tr");

        if (sv.score < 5){
            tr.classList.add("low-score");
        }

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${sv.name}</td>
            <td>${sv.score}</td>
            <td>${rank}</td>
            <td>
                <button data-index="${students.indexOf(sv)}" class="deleteBtn">Xóa</button>
            </td>
        `;

        tableBody.appendChild(tr);

        sum += sv.score;
    });

    const avg = filteredStudents.length
        ? (sum / filteredStudents.length).toFixed(2)
        : 0;
        
    totalText.textContent = students.length;
    avgText.textContent = avg;
}

tableBody.addEventListener("click", function(e){

    if(e.target.classList.contains("deleteBtn")){

        const index = e.target.dataset.index;

        students.splice(index, 1);

        applyFilters();
    }
});

searchInput.addEventListener("input", applyFilters);

filterRank.addEventListener("change", applyFilters);

sortScore.addEventListener("click", function(){

    sortAsc = !sortAsc;

    sortScore.textContent = sortAsc ? "Điểm ▲" : "Điểm ▼";

    applyFilters();

});

function applyFilters(){

    const keyword = searchInput.value.toLowerCase();
    const filter = filterRank.value;

    filteredStudents = students.filter(sv => {

        const matchName = sv.name.toLowerCase().includes(keyword);
        const rank = getRank(sv.score);

        const matchRank = filter === "all" || rank === filter;

        return matchName && matchRank;

    });

    filteredStudents.sort((a,b)=>{
        return sortAsc ? a.score - b.score : b.score - a.score;
    });

    renderTable();
}

function getRank(score){

    if(score >= 8.5) return "Giỏi";
    if(score >= 7) return "Khá";
    if(score >= 5) return "Trung Bình";

    return "Yếu";
}
applyFilters();