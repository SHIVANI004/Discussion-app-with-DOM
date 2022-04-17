var que_box = document.getElementById("que_box");
var ans_box = document.getElementById("answer_box");
var submit = document.getElementById("submit");
var i = 0;
var curr;

var data = localStorage.getItem("discussion");

if (data)
    data = JSON.parse(data);

var arr = data || [];

arr.forEach(function(data) {
    var subject = data.subject;
    var description_text = data.question;


    var container = document.createElement("div");
    container.classList.add("que_container");
    container.setAttribute("id", i);

    var subject_heading = document.createElement("h3");
    subject_heading.innerText = subject;
    subject_heading.setAttribute("id", i);

    var description_node = document.createElement("p");
    description_node.innerText = description_text;
    description_node.setAttribute("id", i);
    i++;

    container.appendChild(subject_heading);
    container.appendChild(description_node);

    que_box.appendChild(container);
});

submit.addEventListener("click", function() {
    var subject = document.getElementById("sub").value.trim();
    var title = document.getElementById("question").value.trim();

    if (subject && title) {
        var que_container = document.createElement("div");
        que_container.classList.add("que_container");
        que_container.setAttribute("id", i);

        var head = document.createElement("h3");
        head.innerHTML = subject;
        head.setAttribute("id", i);

        var question = document.createElement("p");
        question.innerHTML = title;
        question.setAttribute("id", i);
        i++;

        que_container.appendChild(head);
        que_container.appendChild(question);

        que_box.appendChild(que_container);

        arr.push({
            subject: subject,
            question: title,
            count: 0,
            comment: []
        });

        localStorage.setItem("discussion", JSON.stringify(arr));

        document.getElementById("sub").value = '';
        document.getElementById("question").value = '';
    }
});

que_box.addEventListener('click', function(e) {

    document.getElementById("right_pane1").style.display = "none";
    document.getElementById("right_pane2").style.display = "initial";

    curr = parseInt(e.target.id);

    var subject_heading = document.getElementById("que_h");
    subject_heading.innerText = arr[curr].subject;

    var description_node = document.getElementById("que_t");
    description_node.innerText = arr[curr].question;

    while (ans_box.firstChild) {
        ans_box.removeChild(ans_box.lastChild);
    }

    arr[curr].comment.forEach(function(data) {
        var ans_container = document.createElement("div");
        ans_container.classList.add("ans_container");

        var head = document.createElement("h5");
        head.innerHTML = data.name;

        var answer = document.createElement("p");
        answer.innerHTML = data.comment;

        ans_container.appendChild(head);
        ans_container.appendChild(answer);

        ans_box.appendChild(ans_container);
    });

});

document.getElementById("ans_submit").addEventListener('click', function() {

    var name = document.getElementById("name").value;
    var comment = document.getElementById("comment").value;

    if (name && comment) {
        var ans_container = document.createElement("div");
        ans_container.classList.add("ans_container");

        var head = document.createElement("h5");
        head.innerHTML = name;

        var answer = document.createElement("p");
        answer.innerHTML = comment;

        ans_container.appendChild(head);
        ans_container.appendChild(answer);

        ans_box.appendChild(ans_container);

        document.getElementById("name").value = '';
        document.getElementById("comment").value = '';

        arr[curr].comment.push({
            name: name,
            comment: comment
        });
        arr[curr].count++;

        localStorage.setItem("discussion", JSON.stringify(arr));
    }
});


document.getElementById("resolve").addEventListener('click', function() {

    que_box.removeChild(que_box.childNodes[curr + 1]);

    document.getElementById("right_pane2").style.display = "none";
    document.getElementById("right_pane1").style.display = "initial";

    for (var j = curr; j < arr.length - 1; j++) {
        arr[j] = arr[j + 1];
        temp = j + 1;
        document.getElementById(temp).setAttribute("id", j);
        document.getElementById(temp).setAttribute("id", j);
        document.getElementById(temp).setAttribute("id", j);
    }
    i--;
    arr.length--;
    localStorage.setItem("discussion", JSON.stringify(arr));

});

document.getElementById("new_que").addEventListener('click', function() {
    document.getElementById("right_pane2").style.display = "none";
    document.getElementById("right_pane1").style.display = "initial";
});

var printed = false;

document.getElementById("search").addEventListener("keyup", function() {
    var search = document.getElementById("search").value.toUpperCase();
    var child = document.getElementById("que_nothing");

    i = 0;
    var not_found = true;

    arr.forEach(function(data) {

        var case_check = data.subject.toUpperCase();
        if (case_check.indexOf(search) > -1) {
            document.getElementById(i).style.display = "";
            document.getElementById(i).style.display = "";
            document.getElementById(i).style.display = "";
            not_found = false;
        } else {
            document.getElementById(i).style.display = "none";
            document.getElementById(i).style.display = "none";
            document.getElementById(i).style.display = "none";
        }
        if (!not_found && printed) {
            child.parentNode.removeChild(child);
            printed = false;
        }
        i++;
    });

    if (not_found && !printed) {
        var que_container = document.createElement("section");
        que_container.setAttribute('id', "que_nothing");

        var head = document.createElement("h4");
        head.innerHTML = "No match found";

        que_container.appendChild(head);
        que_box.appendChild(que_container);

        printed = true
    }

});