let TaskTitle;
let TaskDesc;
let startDate;
let endDate;
let TaskStatus;



//Add Task
function setData() {
    TaskTitle = document.getElementById("ToDoTitle").value;
    TaskDesc = document.getElementById("TodoDesc").value;
    startDate = document.getElementById("sDate").value;
    endDate = document.getElementById("eDate").value;
    TaskStatus = document.getElementById("tStatus").value;

    if (validate()) {
        var myArr;
        if (JSON.parse(window.localStorage.getItem('TData')) == null) {
            myArr = [];
        }
        else {
            myArr = JSON.parse(window.localStorage.getItem('TData'));
        }

        myArr.push(
            {
                Title: TaskTitle,
                Desc: TaskDesc,
                StartDate: startDate,
                EndDate: endDate,
                Status: TaskStatus
            }
        );
        window.localStorage.setItem('TData', JSON.stringify(myArr));
        document.getElementById("ToDoTitle").value = '';
        document.getElementById("TodoDesc").value = '';
        document.getElementById("sDate").value = '';
        document.getElementById("eDate").value = '';
        document.getElementById("tStatus").value = '';
        window.location.href = "TaskList.html";
    }

}

//Show Task List
function ShowData() {
    //window.localStorage.clear();
    var myArr;
    if (JSON.parse(window.localStorage.getItem('TData')) === null) {
        myArr = [];
    }
    else {
        myArr = JSON.parse(window.localStorage.getItem('TData'));
    }

    // console.log(window.localStorage.getItem('TData'));
    // document.getElementById("demo").innerHTML = myArr;

    var data = "";
    if(myArr.length == 0)
    {
        document.getElementById("taskTable").style.display = "none";
        document.getElementById("message").innerHTML = 'No Tasks to do!!!';
    }
    else
    {
        myArr.forEach(function (element, index) {
            data += '<tr>';
            data += '<td>' + element.Title + '</td>';
            data += '<td>' + element.Desc + '</td>';
            data += '<td>' + element.StartDate + '</td>';
            data += '<td>' + element.EndDate + '</td>';
            data += '<td>' + element.Status + '</td>';
            data += '<td><button class="btn btn-danger" onclick = deleteTask(' + index + ')>Delete</button></td>';
            data += '<td><button class="btn btn-info" onclick = checkIndex(' + index + ')>Edit</button></td>';
            data += '</tr>';
        });

        document.getElementById("TaskListTable").innerHTML = data;
    }
   
}

//Delete Task
function deleteTask(index) {
    var taskList;
    if (JSON.parse(window.localStorage.getItem('TData')) == null) {
        taskList = [];
    }
    else {
        taskList = JSON.parse(window.localStorage.getItem('TData'));
    }

    if(confirm("Are you sure do you want to delete?"))
    {
        taskList.splice(index, 1);//at position 'index' remove 1 item
        localStorage.setItem('TData', JSON.stringify(taskList));
    }
    
    //window.alert("Task deleted successfully!!");
    ShowData();
}


//Check Index
function checkIndex(index) {
    if (index != null) {
        localStorage.setItem('TaskIndex', JSON.stringify(index));
        window.location.href = "ToDoList.html";
    }
    else {
        window.location.href = "ToDoList.html";
    }
}


//Get index
function getIndex() {
    var index = JSON.parse(localStorage.getItem('TaskIndex'));
    if (index != null) {
        getData(index);
    }
}

//Get Task details 
function getData(index) {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";
    //location.href = "ToDoList.html";
    var myData; ToDoTitle
    if (JSON.parse(window.localStorage.getItem('TData')) == null) {
        myData = [];
    }
    else {
        myData = JSON.parse(window.localStorage.getItem('TData'));
    }

    document.getElementById("ToDoTitle").value = myData[index].Title;
    document.getElementById("TodoDesc").value = myData[index].Desc;
    document.getElementById("sDate").value = myData[index].StartDate;
    document.getElementById("eDate").value = myData[index].EndDate;
    document.getElementById("tStatus").value = myData[index].Status;

    updateTask(index, myData);
}


//Update Task
function updateTask(index, myData) {
    document.getElementById("Update").onclick = function () {
        TaskTitle = document.getElementById("ToDoTitle").value;
        TaskDesc = document.getElementById("TodoDesc").value;
        startDate = document.getElementById("sDate").value;
        endDate = document.getElementById("eDate").value;
        TaskStatus = document.getElementById("tStatus").value;

        if (validate()) {
            myData[index].Title = TaskTitle;
            myData[index].Desc = TaskDesc;
            myData[index].StartDate = startDate;
            myData[index].EndDate = endDate;
            myData[index].Status = TaskStatus;
            // myData[index].Title = document.getElementById("ToDoTitle").value;
            // myData[index].Desc = document.getElementById("TodoDesc").value ;
            // myData[index].StartDate = document.getElementById("sDate").value;
            // myData[index].EndDate = document.getElementById("eDate").value;
            // myData[index].Status = document.getElementById("tStatus").value;

            localStorage.setItem('TData', JSON.stringify(myData));

            document.getElementById("ToDoTitle").value = '';
            document.getElementById("TodoDesc").value = '';
            document.getElementById("sDate").value = '';
            document.getElementById("eDate").value = '';
            document.getElementById("tStatus").value = '';

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";

            window.localStorage.removeItem('TaskIndex');
            window.alert("Task Updated!!");
            window.location.href = "TaskList.html";
        }
    }
}

function showErrMsg(id,msg)
{
    document.getElementById(id).innerHTML = msg;
}

//Validate 
function validate() 
{
    var tname = tdesc = sdate = edate = true;
    

    if (TaskTitle == "") {
        showErrMsg("validTitle","Please enter task title!!");
    }
    else
    {
        tname = false;
    }


    if (TaskDesc == "") {
        showErrMsg("validDesc","Please enter task description!!");
    }
    else
    {
        tdesc = false;
    }


    if (startDate == "") {
        showErrMsg("validSDate","Please select start date!!");
    }
    else
    {
        sdate = false;
    }
    

    if (endDate == "") {
        showErrMsg("validEDate","Please select end date!!");
    }
    else if(endDate < startDate)
    {
        showErrMsg("validEDate","End date must be equal or greater than start date!!");
    }
    else
    {
        edate = false;
    }

    // if(endDate.value < startDate.value)
    // {
    //     document.getElementById("validEDate").innerHTML ="End date must be equal or greater than Start date!";
    //     return false;
    // }

    if((tname || tdesc || sdate || edate) == true)
    {
        return false;
    }
    else
    {
        return true;
    }
}


