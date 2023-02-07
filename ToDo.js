let TaskTitle;
let TaskDesc;
let startDate;
let endDate;
let TaskStatus;


function setData()
{
 
    TaskTitle = document.getElementById("ToDoTitle").value;
    TaskDesc = document.getElementById("TodoDesc").value;
    startDate = document.getElementById("sDate").value;
    endDate = document.getElementById("eDate").value;
    TaskStatus = document.getElementById("tStatus").value;

    if(validate())
    {
        console.log(TaskTitle + TaskDesc + startDate + endDate + TaskStatus);
        let TaskData = 
        {
            Title : TaskTitle,
            Desc : TaskDesc,
            StartDate : startDate,
            EndDate : endDate,
            Status : TaskStatus 
        }

        var myArr = [];
        //var ListData = JSON.parse(window.localStorage.getItem('TData'));
        if(JSON.parse(window.localStorage.getItem('TData')) == null)
        {
            myArr = []; 
        }
        else
        {
            myArr.push(JSON.parse(window.localStorage.getItem('TData')));
        }
        
        myArr.push(TaskData);
        window.localStorage.setItem('TData',JSON.stringify(myArr));
        //document.getElementById("demo").innerHTML = window.localStorage.getItem('TData');

        // window.localStorage.clear();
        // document.getElementById("demo").innerHTML = window.localStorage.getItem('TData');

        //getData();
     }
    
}

function getData()
{
    //var ListData = {};
    //ListData = JSON.parse(window.localStorage.getItem('TData'));
    //document.getElementById("demo").innerHTML=ListData;
    var myArr = [];
    if (JSON.parse(window.localStorage.getItem('TData')) == null)
    {
        myArr = [];
    }
    else
    {
        myArr.push(JSON.parse(window.localStorage.getItem('TData')));
    }

    document.getElementById("demo").innerHTML = window.localStorage.getItem('TData');
    console.log(myArr[0][0]['Title']);
    // var table = '';
    // for(var i=0 ; i < myArr.length; i++)
    // {
    //     table += '<tr>';
    //     //table += '<td>' + myArr[i] + '</td>';
    //     for(var j=0;j<myArr[i][j].length; j++)
    //     {
    //         table += '<td>' + myArr[i][j].Title + '</td>';
    //         table += '<td>' + myArr[i][j].Desc + '</td>';
    //         table += '<td>' + myArr[i][j].StartDate + '</td>';
    //         table += '<td>' + myArr[i][j].EndDate + '</td>';
    //         table += '<td>' + myArr[i][j].TaskStatus + '</td>';
    //     }
    //     table += '</tr>'
    // }
    //console.log(window.localStorage.getItem('TData'));
    // document.getElementById("TaskListTable").innerHTML = table;
    // console.log(table);
}

function validate()
{
    var re = new RegExp('[0-9]');
    if(TaskTitle == "")
    {
        alert("Please enter task title!");
        return false;
    }

    if(re.test(TaskTitle))
    {
        alert("Title should not contain any number!");
        return false;
    }

    if(TaskDesc == "")
    {
        alert("Please enter task description!");
        return false;
    }

    if(startDate == "")
    {
        alert("Please select start date!");
        return false;
    }

    if(endDate == "")
    {
        alert("Please select end date!");
        return false;
    }
    return true;
}

