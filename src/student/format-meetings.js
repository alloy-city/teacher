import { post } from '../http';

function createTableHeaders() {
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    let courseName = document.createElement("th");
    let meetingTime = document.createElement("th");
    let presence = document.createElement("th");

    courseName.innerText = string.meetings.courseName;
    meetingTime.innerText = string.meetings.meetingTime;
    presence.innerText = string.meetings.presence;

    tr.appendChild(courseName);
    tr.appendChild(meetingTime);
    tr.appendChild(presence);

    thead.appendChild(tr);

    return thead;
}

function switchPresence(e, m) {
    post({
        user_id: Teacher.Student.selected._id,
        course: m.course._id,
        index: m.index
    }, "meeting/presence", answer => {
        console.log(answer);

        if (answer && answer.present == false) {
            e.target.classList.remove("glyphicon-ok", "text-success");
            e.target.classList.add("glyphicon-remove", "text-danger");
        } else if (answer && answer.present == true) {
            e.target.classList.remove("glyphicon-remove", "text-danger");
            e.target.classList.add("glyphicon-ok", "text-success");
        }
    });
}

function formatMeetings(meetings) {
    if (meetings.length > 0) {
        let div = document.getElementById("student-meetings");
        div.classList.add("table-responsive");
        let table = document.createElement("table");
        table.classList.add("table", "table-condensed", "table-condensed", "table-hover");
        let tbody = document.createElement("tbody");

        table.appendChild(createTableHeaders());
        table.appendChild(tbody);

        let now = new Date();
        let state = 0;
        let previousLine;

        meetings.forEach(m => {
            let line = document.createElement("tr");
            let course = document.createElement("td");
            let time = document.createElement("td");
            let presence = document.createElement("td");

            course.innerText = m.course.name;

            let t = moment(m.time);

            time.innerText = t.format("LL - LT");

            if (t > now) {
                line.classList.add("info");
            } else {
                if (state == 0) {
                    state = 1;
                    if (previousLine) {
                        previousLine.classList.remove("info");
                        previousLine.classList.add("success");
                        previousLine.setAttribute("title", "En vert, le prochain cours de cet apprenant.");
                    }
                }

                if (m.present) {
                    presence.innerHTML = `<span class="glyphicon glyphicon-ok text-success" aria-hidden="true" role="button"></span>`;
                    presence.onclick = e => {
                        switchPresence(e, m);
                    };
                } else {
                    presence.innerHTML = `<span class="glyphicon glyphicon-remove text-danger" aria-hidden="true" role="button"></span>`;
                    presence.onclick = e => {
                        switchPresence(e, m);
                    };
                }
            }

            line.appendChild(course);
            line.appendChild(time);
            line.appendChild(presence);

            tbody.appendChild(line);
            previousLine = line;
        });

        div.appendChild(table);
    }
}

export { formatMeetings }
