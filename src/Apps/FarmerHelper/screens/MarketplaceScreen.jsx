import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { PlusCircle, CheckCircle2, Circle, CalendarDays, Folder } from 'lucide-react-native';

export default function Tasks() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Water tomato plants',
      date: '2025-04-06',
      priority: 'High',
      completed: false,
      category: 'Irrigation'
    },
    {
      id: 2,
      title: 'Apply fertilizer to corn field',
      date: '2025-04-07',
      priority: 'Medium',
      completed: false,
      category: 'Fertilization'
    },
    {
      id: 3,
      title: 'Harvest potatoes',
      date: '2025-04-08',
      priority: 'High',
      completed: false,
      category: 'Harvesting'
    },
    {
      id: 4,
      title: 'Check soil pH levels',
      date: '2025-04-06',
      priority: 'Low',
      completed: true,
      category: 'Monitoring'
    }
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? {...task, completed: !task.completed} : task
    ));
  };

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: tasks.length + 1,
        title: newTask,
        date: new Date().toISOString().split('T')[0],
        priority: 'Medium',
        completed: false,
        category: 'General'
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#FF715B';
      case 'Medium': return '#FFA62B';
      case 'Low': return '#69B578';
      default: return '#95A5A6';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Add new task..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <PlusCircle size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            {tasks.filter(t => !t.completed).length}
          </Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            {tasks.filter(t => t.completed).length}
          </Text>
          <Text style={styles.summaryLabel}>Completed</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            {tasks.filter(t => t.priority === 'High' && !t.completed).length}
          </Text>
          <Text style={styles.summaryLabel}>High Priority</Text>
        </View>
      </View>

      <ScrollView style={styles.taskList}>
        {tasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={[
              styles.taskCard,
              task.completed && styles.completedTask
            ]}
            onPress={() => toggleTask(task.id)}
          >
            <View style={styles.taskHeader}>
              <View style={styles.taskHeaderLeft}>
                {task.completed ? (
                  <CheckCircle2 size={24} color="#69B578" />
                ) : (
                  <Circle size={24} color="#999" />
                )}
                <Text style={[
                  styles.taskTitle,
                  task.completed && styles.completedTaskText
                ]}>
                  {task.title}
                </Text>
              </View>
              <View style={[
                styles.priorityBadge,
                { backgroundColor: getPriorityColor(task.priority) }
              ]}>
                <Text style={styles.priorityText}>{task.priority}</Text>
              </View>
            </View>
            
            <View style={styles.taskFooter}>
              <View style={styles.taskDetail}>
                <CalendarDays size={16} color="#666" />
                <Text style={styles.taskDetailText}>{task.date}</Text>
              </View>
              <View style={styles.taskDetail}>
                <Folder size={16} color="#666" />
                <Text style={styles.taskDetailText}>{task.category}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    elevation: 2,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#FFA62B',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 5,
  },
  taskList: {
    flex: 1,
  },
  taskCard: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  completedTask: {
    opacity: 0.7,
    backgroundColor: '#F8F9FA',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    color: '#2C3E50',
    marginLeft: 10,
    flex: 1,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#95A5A6',
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  priorityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  taskDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskDetailText: {
    marginLeft: 5,
    color: '#666',
    fontSize: 12,
  },
});