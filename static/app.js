console.log('app.js が読み込まれました');

let currentListId = 1;

const api = {
  list:   (listId) => fetch(`/todos/?list_id=${listId}`).then(r => r.json()),
  create: (title, listId) => fetch('/todos/', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ title, done: false, list_id: listId })
           }).then(r => r.json()),
  update: (t) => fetch(`/todos/${t.id}`, {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(t)
           }).then(r => r.json()),
  del:    (id) => fetch(`/todos/${id}`, { method: 'DELETE' }),
  getLists: () => fetch('/lists/').then(r => r.json()),
  createList: (name) => fetch('/lists/', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ name })
           }).then(r => r.json())
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

async function load() { render(await api.list(currentListId)); }

const addTodo = async () => {
  const input = document.getElementById('title');
  const title = input.value.trim();
  if (!title) return;
  await api.create(title, currentListId);
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

// リスト切り替え機能
const $listSelectorLeft = document.getElementById('listSelectorLeft');
const $listDropdown = document.getElementById('listDropdown');
const $currentListName = document.getElementById('currentListName');
const $listOptions = document.getElementById('listOptions');
const $addListBtn = document.getElementById('addListBtn');
const $listAddModal = document.getElementById('listAddModal');
const $newListName = document.getElementById('newListName');
const $confirmAddList = document.getElementById('confirmAddList');
const $cancelAddList = document.getElementById('cancelAddList');

console.log('Elements:', {
  $addListBtn,
  $listAddModal,
  $newListName,
  $confirmAddList,
  $cancelAddList
});

const loadLists = async () => {
  const lists = await api.getLists();
  $listOptions.innerHTML = '';
  lists.forEach(list => {
    const li = document.createElement('li');
    li.textContent = list.name;
    li.dataset.listId = list.id;
    if (list.id === currentListId) {
      li.classList.add('active');
    }
    li.onclick = () => {
      currentListId = list.id;
      $currentListName.textContent = list.name;
      $listDropdown.classList.remove('expanded');
      load();
      loadLists();
    };
    $listOptions.append(li);
  });
};

$listSelectorLeft.addEventListener('click', () => {
  $listDropdown.classList.toggle('expanded');
});

if ($addListBtn) {
  console.log('+ボタンのイベントリスナーを登録します');
  $addListBtn.addEventListener('click', (e) => {
    console.log('+ボタンがクリックされました');
    e.stopPropagation();
    $listAddModal.classList.add('active');
    console.log('モーダルにactiveクラスを追加しました');
    $newListName.focus();
  });
} else {
  console.error('+ボタンが見つかりませんでした');
}

$cancelAddList.addEventListener('click', () => {
  $listAddModal.classList.remove('active');
  $newListName.value = '';
});

$confirmAddList.addEventListener('click', async () => {
  const name = $newListName.value.trim();
  if (!name) return;
  const newList = await api.createList(name);
  $newListName.value = '';
  $listAddModal.classList.remove('active');
  currentListId = newList.id;
  $currentListName.textContent = newList.name;
  loadLists();
  load();
});

$newListName.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    $confirmAddList.click();
  }
  if (e.key === 'Escape') {
    $cancelAddList.click();
  }
});

$listAddModal.addEventListener('click', (e) => {
  if (e.target === $listAddModal) {
    $cancelAddList.click();
  }
});

loadLists();
load();
