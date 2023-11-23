import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Todos } from '../data/todos';

export const TODO_TABLE = 'todos'
@Injectable({
  providedIn: 'root'
})
export class TodoService {


  private supabase: SupabaseClient

  constructor () {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }


  async getTodos () {
    let { data: todos, error } = await this.supabase
    .from('todos')
    .select('*')
    .order('time', { ascending: true })
            
    return todos;
  }

  async deleteTodo (todo: Todos) {
    const {data, error} = await this.supabase
      .from('todos')
      .delete()
      .eq('id', todo)

    return data
  }

  async createFood(todo : Todos) {

    const {data, error} = await this.supabase
      .from('todos')
      .insert({
        title: todo.title,
        description: todo.description,
        time: todo.time,
        latitude: todo.latitude,
        longitude: todo.longitude

      })
      .select('*')
      .single();

    return data
  }

  async getTodo (id: number) {
    const { data, error } = await this.supabase
      .from('todos')
      .select('*')
      .eq('id', id)
      .single()

    return data || {}
  }

  async updateTodo (todo: Todos) {
    if(todo.time as any === 0){
      delete todo.time;
    }
    console.log("Update: ", todo)
    const { data, error } = await this.supabase
    .from('todos')
    .update(todo)
    .eq('id', todo.id)
    .select()
    if (error) {
      console.error("Fehler beim Aktualisieren des Todos:", error);
    } else {
      console.log("Todo erfolgreich aktualisiert:", data);
    }
  } catch (error: any) {
    console.error("Fehler beim Aktualisieren des Todos:", error);
  }
            
  }
