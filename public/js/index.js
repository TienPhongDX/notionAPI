const habitEL = document.querySelector('#habit');
const loadingEL = document.querySelector('#loading');

let loading = false;

const getHabitFromBE = async () =>{
    loading = true;
    const res = await fetch('http://localhost:5000/habits');
    const data = await res.json();
    loading = false;
    return data;
}

const addHabitToDom = async () =>{
    const habits = await getHabitFromBE();

    if (!loading) {
        loadingEL.innerHTML = ''
    }

    habits.forEach(habit => {
        const div = document.createElement('div')
        div.className = 'habit'
        div.innerHTML = `
            <h3>${habit.title}</h3>
            <ul>
                <li>Execrise: ${habit.execrise}</li>
                <li>Foreign Language: ${habit.foreignLang}</li>
            </ul>
        `;
        habitEL.appendChild(div);
    });
}

addHabitToDom()