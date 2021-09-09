import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
tasks: Task[] = [];
ResultSearch: Task[] = [];
showForm = false;
editForm = false;
searchText = '';
myTask:Task = {
  label: '',
  completed:false
}
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.GetTasks();
  }
GetTasks()
{
  this.taskService.finAll().subscribe(tasks =>{
    this.ResultSearch = this.tasks = tasks
  } )
}
deleteTask(id:any)
{
  this.taskService.delete(id).subscribe(() => {
    this.ResultSearch = this.ResultSearch.filter(ResultSearch => ResultSearch.id != id)
  })
}
persistTask()
{
  this.taskService.persiste(this.myTask).subscribe((ResultSearch) => {
    this.ResultSearch =[ResultSearch, ...this.ResultSearch];
    this.resetTask();
    this.showForm =false;
  });
}
//Initiliser apres Ajoute du Task vider les champs
resetTask()
{
  this.myTask = {
    label: '',
    completed: false
  }
}
toggleCompleted(task:any)
{
  this.taskService.completed(task.id ,task.completed).subscribe(() => {
    task.completed = !task.completed
  })
}
editTask(task:any)
{
this.showForm = true;
this.editForm = true;
this.myTask = task;
}
updateTask()
{
  this.taskService.update(this.myTask).subscribe((task)=>{
    this.resetTask();
    this.editForm = false;
    this.showForm = false;
  })
}
AddForm()
{
  this.showForm = true;
  this.editForm=false;

}
searchTasks()
{

  this.ResultSearch = this.tasks.filter((task) => task.label.toLowerCase().includes(this.searchText.toLowerCase()))
}
}