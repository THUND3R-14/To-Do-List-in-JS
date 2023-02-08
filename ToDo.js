let TaskTitle;
let TaskDesc;
let startDate;
let endDate;
let TaskStatus;



//Add Task
function setData()
{
    TaskTitle = document.getElementById("ToDoTitle").value;
    TaskDesc = document.getElementById("TodoDesc").value;
    startDate = document.getElementById("sDate").value;
    endDate = document.getElementById("eDate").value;
    TaskStatus = document.getElementById("tStatus").value;

    if(validate())
    {
        var myArr;
        if(JSON.parse(window.localStorage.getItem('TData')) == null)
        {
            myArr = []; 
        }
        else
        {
            myArr = JSON.parse(window.localStorage.getItem('TData'));
        }
        
        myArr.push(
            {
            Title : TaskTitle,
            Desc : TaskDesc,
            StartDate : startDate,
            EndDate : endDate,
            Status : TaskStatus
            }
        );
        window.localStorage.setItem('TData',JSON.stringify(myArr));
        document.getElementById("ToDoTitle").value = '';
        document.getElementById("TodoDesc").value = '';
        document.getElementById("sDate").value = '';
        document.getElementById("eDate").value = '';
        document.getElementById("tStatus").value = '';
        window.location.href = "TaskList.html";
     }
    
}

//Show Task List
//window.onload = ShowData();
function ShowData()
{
    //window.localStorage.clear();
    var myArr;
    if (JSON.parse(window.localStorage.getItem('TData')) === null)
    {
        myArr = [];
    }
    else
    {
        myArr = JSON.parse(window.localStorage.getItem('TData'));
    }

    // console.log(window.localStorage.getItem('TData'));
    // document.getElementById("demo").innerHTML = myArr;
    
    var data = "";
    myArr.forEach(function(element,index)
    {
        data += '<tr>';
        data += '<td>' + element.Title + '</td>';
        data += '<td>' + element.Desc + '</td>';
        data += '<td>' + element.StartDate + '</td>';
        data += '<td>' + element.EndDate + '</td>';
        data += '<td>' + element.Status + '</td>';
        data += '<td><button class="btn btn-danger" onclick = deleteTask('+ index +')>Delete</button></td>';
        data += '<td><button class="btn btn-info" onclick = checkIndex('+ index +')>Update</button></td>';
        data += '</tr>';
    });
    //console.log(myArr);
    document.querySelector("#TaskListTable tbody").innerHTML = data;
}

//Delete Task
function deleteTask(index)
{
    var taskList;
    if (JSON.parse(window.localStorage.getItem('TData')) == null)
    {
        taskList = [];
    }
    else
    {
        taskList = JSON.parse(window.localStorage.getItem('TData'));
    }

    taskList.splice(index,1);//at position 'index' remove 1 item
    localStorage.setItem('TData',JSON.stringify(taskList));
    ShowData();
}


function checkIndex(index)
{
    if (index != null)
    {
        localStorage.setItem('TaskIndex',JSON.stringify(index));
        window.location.href = "ToDoList.html";
    }
    else
    {
        window.location.href = "ToDoList.html";
    }
}

function getIndex()
{
    var index = JSON.parse(localStorage.getItem('TaskIndex'));
    if(index != null)
    {
        updateTask(index);
    }
}

function updateTask(index)
{
    
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";
    //location.href = "ToDoList.html";
    var myData;ToDoTitle
    if (JSON.parse(window.localStorage.getItem('TData')) == null)
    {
        myData = [];
    }
    else
    {
        myData = JSON.parse(window.localStorage.getItem('TData'));
    }
    
    

   document.getElementById("ToDoTitle").value = myData[index].Title;
   document.getElementById("TodoDesc").value = myData[index].Desc;
   document.getElementById("sDate").value = myData[index].StartDate;
   document.getElementById("eDate").value = myData[index].EndDate;
   document.getElementById("tStatus").value = myData[index].Status;


   document.getElementById("Update").onclick = function()
   {
       if(validate())
       {
        myData[index].Title = document.getElementById("ToDoTitle").value;
        myData[index].Desc = document.getElementById("TodoDesc").value ;
        myData[index].StartDate = document.getElementById("sDate").value;
        myData[index].EndDate = document.getElementById("eDate").value;
        myData[index].Status = document.getElementById("tStatus").value;
     
        localStorage.setItem('TData',JSON.stringify(myData));

        document.getElementById("ToDoTitle").value = '';
        document.getElementById("TodoDesc").value = '';
        document.getElementById("sDate").value = '';
        document.getElementById("eDate").value = '';
        document.getElementById("tStatus").value = '';

        document.getElementById("Submit").style.display = "block";
        document.getElementById("Update").style.display = "none";

        window.localStorage.removeItem('TaskIndex');
        window.location.href = "TaskList.html";

       }
   }
}

//Validate 
function validate()
{
    if(TaskTitle == "")
    {
        document.getElementById("validTitle").innerHTML = "Please Enter Task Title!!";
        return false;
    }
    

    if(TaskDesc == "")
    {
        document.getElementById("validDesc").innerHTML = "Please Enter Task Description!!"
        return false;
    }

    if(startDate == "")
    {
        document.getElementById("validSDate").innerHTML ="Please select start date!";
        return false;
    }

    if(endDate == "")
    {
        document.getElementById("validEDate").innerHTML ="Please select end date!";
        return false;
    }
    return true;
}
