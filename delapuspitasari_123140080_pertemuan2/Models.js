// Class Model Task
export class TaskItem {
  constructor({ id = Date.now().toString(), title, category = "Praktikum", priority = "Sedang", deadline, completed = false }) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.priority = priority;
    this.deadline = deadline;
    this.completed = completed;
  }

  toggleComplete = () => {
    this.completed = !this.completed;
  };

  updateDetails = ({ title, category, priority, deadline }) => {
    this.title = title ?? this.title;
    this.category = category ?? this.category;
    this.priority = priority ?? this.priority;
    this.deadline = deadline ?? this.deadline;
  };

  toJSON = () => ({ ...this });
}

// Class Model Schedule
export class ScheduleItem {
  constructor({ id = Date.now().toString(), title, day, time, room }) {
    this.id = id;
    this.title = title;
    this.day = day;
    this.time = time;
    this.room = room;
  }

  toJSON = () => ({ ...this });
}

// Class Model Note
export class NoteItem {
  constructor({ id = Date.now().toString(), title, content, date = new Date().toLocaleDateString('id-ID') }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.date = date;
  }

  toJSON = () => ({ ...this });
}
