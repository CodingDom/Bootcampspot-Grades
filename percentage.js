(function() {
    'use strict';
    console.log("Laoding grade percentages..");  
    const gradeValueList = {
        'A+': 105,
        'A': 100,
        'A-': 95,
        'B+': 90,
        'B': 85,
        'B-': 80,
        'C+': 75,
        'C': 70,
        'C-': 65,
        'D+': 60,
        'D': 55,
        'D-': 50,
        'F+': 45,
        'F': 40,
        'F-': 35,
        'I':0,
        };
    
    let totalGradeValue = 0;
    let amountOfAssignments = 0;
    
    function loadGradebook() {
        let waitForGrades = setInterval(function() {
            if (document.querySelectorAll("tbody > .row").length > 20) {
                clearInterval(waitForGrades);
                showPercentages();
            };
        },50);
    };
        
    function showPercentages() {
        Array.from(document.querySelectorAll("tbody > .row")).forEach(function(row) {
            const submission = row.children[2].querySelector("strong");
            const grade = row.children[3].querySelectorAll("strong")?row.children[3].querySelectorAll("strong")[1]:null;
            if (submission && submission.textContent.toLowerCase().indexOf("submitted") > -1 && grade) {
                const gradeValue = gradeValueList[grade.textContent];
                if (gradeValue) {
                    grade.textContent += " (" + gradeValue + "%)"
                    totalGradeValue += gradeValue;
                    amountOfAssignments++;
                }
            };
        });
        
        const gradeAvg = document.querySelector("p.headline");
        gradeAvg.innerHTML += "<i>("+parseFloat(totalGradeValue/amountOfAssignments).toFixed(2) + "%)</i>";
        gradeAvg.style = "position: relative";
        document.querySelector("p.headline > i").style = `position: absolute;bottom: -30px;text-align: center;width: 100%;left: 0;font-size: 20px;`;
        
        Array.from(document.getElementsByClassName("text-success")).forEach(function(elem){
            elem.style.color = "#45d080";
        });
    };
    
    document.querySelector("main").addEventListener('DOMNodeInserted', function(e) {
        if (e.target.getAttribute && e.target.getAttribute("class") == "student-grade-info") {
            loadGradebook();
        };
    });
    
    })();