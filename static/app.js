const api = {
  list:   () => fetch('/todos/').then(r => r.json()),
  create: (title) => fetch('/todos/', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ title, done: false })
           }).then(r => r.json()),
  update: (t) => fetch(`/todos/${t.id}`, {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(t)
           }).then(r => r.json()),
  del:    (id) => fetch(`/todos/${id}`, { method: 'DELETE' })
};

const $list = document.getElementById('list');
const $completedList = document.getElementById('completedList');
const $completedCount = document.getElementById('completedCount');

const createTodoItem = (t, isCompleted = false) => {
  const li = document.createElement('li');
  const chk = document.createElement('input');
  chk.type = 'checkbox';
  chk.checked = t.done;

  const span = document.createElement('span');
  span.textContent = t.title;
  span.className = t.done ? 'done' : '';

  const del = document.createElement('button');
  del.textContent = 'Delete';

  chk.onchange = async () => {
    t.done = chk.checked;
    await api.update(t);

    // フェードアウトアニメーション
    li.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
      load();
    }, 300);
  };

  del.onclick = async () => {
    li.style.animation = 'fadeOut 0.3s ease';
    setTimeout(async () => {
      await api.del(t.id);
      load();
    }, 300);
  };

  li.append(chk, span, del);
  return li;
};

const render = (items = []) => {
  $list.innerHTML = '';
  $completedList.innerHTML = '';

  const activeTodos = items.filter(t => !t.done);
  const completedTodos = items.filter(t => t.done);

  activeTodos.forEach(t => {
    $list.append(createTodoItem(t, false));
  });

  completedTodos.forEach(t => {
    $completedList.append(createTodoItem(t, true));
  });

  $completedCount.textContent = completedTodos.length;
};

async function load() { render(await api.list()); }

const addTodo = async () => {
  const input = document.getElementById('title');
  const title = input.value.trim();
  if (!title) return;
  await api.create(title);
  input.value = '';
  load();
};

document.getElementById('add').onclick = addTodo;

document.getElementById('title').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTodo();
  }
});

// 完了セクションの展開/折りたたみ
const $completedHeader = document.getElementById('completedHeader');
const $toggleIcon = document.getElementById('toggleIcon');

$completedHeader.addEventListener('click', () => {
  $completedList.classList.toggle('expanded');
  $toggleIcon.classList.toggle('expanded');
});

load();
