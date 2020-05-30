// 2016-06-30
/*
var groupID;
var selectedGroup = '';
var url = '../php/get_selected_group_data.php';
var params;

var iJoin;
var connected = false;

function getInRoom(id) {
    if (groupID) {
        $('#group-id-' + groupID).removeClass('active');
    }
    $('#group-id-' + id).addClass('active');
    $('.usersXpControls').html('');
    groupID = id;
    iJoin = [Number(groupID), Auth.userData.id, true];
    params = "groupid=" + String(groupID);

    var oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.open("get", url + "?" + params, true);
    oReq.send();

    loadEClassSocketEvents();
}

function reqListener() {
    var x = JSON.parse(this.responseText);
    selectedGroup = x['0'];

    if (selectedGroup !== undefined) {
        selectedGroup.users = []
        var tempUsers = [
            Number(selectedGroup.user1),
            Number(selectedGroup.user2),
            Number(selectedGroup.user3),
            Number(selectedGroup.user4),
            Number(selectedGroup.user5),
            Number(selectedGroup.user6),
            Number(selectedGroup.user7)
        ]

        for (var o = 0; o < tempUsers.length; o++) {
            if (tempUsers[o] != 0) {
                selectedGroup.users.push(tempUsers[o]);
            }
        }

        setMissionUsers(selectedGroup.users);
        notifyUsersOfFacilitatorPresence(selectedGroup.users); // Now done at course/launch-class.js

        //Determine the number of users in the groupe and build the html markup
        for (var i = 1; i < 9; i++) {
            $('.usersXpControls').append('<div id="hangout-tab-' + i + '" class="groupUsersContainer" style="display:none"><table class="groupUsersTable" width="100%">');
            for (var ii = 0; ii < selectedGroup.users.length; ii++) {
                $('#hangout-tab-' + i).append('<tr class="user' + ii + '" style="height:30px; display:none"><td class="userNameTr"><p class="userName" name="user' + ii + '"></p></td><td class="userButtons"><input data-student="" data-btn="presence" data-maxvalue="5" class="hangoutXpButton" name="user' + ii + '" value="0" type="button" title="Sommez 5 points par hangout où l\'utilisateur est présent." onclick="buttonClicked(this.value, this.name, this.getAttribute(\'data-btn\'), this.getAttribute(\'data-student\'), this.getAttribute(\'data-maxvalue\'), $(this).closest(\'div\').attr(\'id\'))"/><input data-student="" data-btn="ponctuality" data-maxvalue="5" class="hangoutXpButton" name="user' + ii + '" type="button" title="Sommez 5 points par hangout où l\'utilisateur est arrivé à l\'heure." onclick="buttonClicked(this.value, this.name, this.getAttribute(\'data-btn\'), this.getAttribute(\'data-student\'), this.getAttribute(\'data-maxvalue\'), $(this).closest(\'div\').attr(\'id\'))"/><input data-student="" data-btn="participation" class="xpInputSlider" name="user' + ii + '" title="Rémunerez l\'utilisateur de 0 à 20 points par hangout en fonction de sa participation." type="range" max="20" value="0" onchange="sliderMoved(this.value, this.getAttribute(\'data-btn\'), this.getAttribute(\'data-student\'), $(this).closest(\'div\').attr(\'id\'))" onmousemove="findTotal($(this).closest(\'div\').attr(\'id\'), this.getAttribute(\'data-student\'), this.value)"/><input data-student="" data-btn="oral_expr" class="xpInputSlider" name="user' + ii + '" title="Rémunerez l\'utilisateur de 0 à 25 points par hangout en fonction de la progression de son expression orale." type="range" max="25" value="0" onchange="sliderMoved(this.value, this.getAttribute(\'data-btn\'), this.getAttribute(\'data-student\'), $(this).closest(\'div\').attr(\'id\'))" onmousemove="findTotal($(this).closest(\'div\').attr(\'id\'), this.getAttribute(\'data-student\'), this.value)"/><input data-student="" data-btn="hangout_skill" class="xpInputSlider" name="user' + ii + '" title="Rémunerez l\'utilisateur de 0 à 10 points par hangout en fonction de la progression de ses compétences linguistiques." type="range" max="10" value="0" onchange="sliderMoved(this.value, this.getAttribute(\'data-btn\'), this.getAttribute(\'data-student\'), $(this).closest(\'div\').attr(\'id\'))" onmousemove="findTotal($(this).closest(\'div\').attr(\'id\'), this.getAttribute(\'data-student\'), this.value)"/><input data-student="" data-btn="listening" class="xpInputSlider" name="user' + ii + '" title="Rémunerez l\'utilisateur de 0 à 20 points par hangout en fonction de sa progression en compréhension orale." type="range" max="20" value="0" onchange="sliderMoved(this.value, this.getAttribute(\'data-btn\'), this.getAttribute(\'data-student\'), $(this).closest(\'div\').attr(\'id\'))" onmousemove="findTotal($(this).closest(\'div\').attr(\'id\'), this.getAttribute(\'data-student\'), this.value)"/><input data-student="" data-btn="h_all" class="allButton" name="user' + ii + '" value="0" onclick="hangoutAll(this.value, this.getAttribute(\'data-student\'), $(this).closest(\'div\').attr(\'id\'), this.getAttribute(\'data-btn\'))" type="button" title="Apprenant exemplaire en hangout !"/><input data-student="" data-btn="mission_accomp" data-maxvalue="20" class="missionXpButton" name="user' + ii + '" type="button" title="Mission accomplie" onclick="buttonClicked(this.value, this.name, this.getAttribute(\'data-btn\'), this.getAttribute(\'data-student\'), this.getAttribute(\'data-maxvalue\'), $(this).closest(\'div\').attr(\'id\'))"/><input data-student="" data-btn="writing" class="xpInputSlider" name="user' + ii + '" title="Rémunerez l\'utilisateur de 0 à 40 points en fonction de la progression de son expression écrite." type="range" max="40" value="0" onchange="sliderMoved(this.value, this.getAttribute(\'data-btn\'), this.getAttribute(\'data-student\'), $(this).closest(\'div\').attr(\'id\'))" onmousemove="findTotal($(this).closest(\'div\').attr(\'id\'), this.getAttribute(\'data-student\'), this.value)"/><input data-student="" data-btn="mission_skill" class="xpInputSlider" name="user' + ii + '" title="Rémunerez l\'utilisateur de 0 à 25 points en fonction de la progression de ses compétences linguistiques." type="range" max="25" value="0" onchange="sliderMoved(this.value, this.getAttribute(\'data-btn\'), this.getAttribute(\'data-student\'), $(this).closest(\'div\').attr(\'id\'))" onmousemove="findTotal($(this).closest(\'div\').attr(\'id\'), this.getAttribute(\'data-student\'), this.value)"/><input data-student="" data-btn="m_all" class="allButton" name="user' + ii + '" type="button" title="Mission parfaitement accomplie !" onclick="missionAll(this.value, this.getAttribute(\'data-student\'), $(this).closest(\'div\').attr(\'id\'), this.getAttribute(\'data-btn\'))"/></td><td class="saveButton"><p name="user' + ii + '" data-student="" class="userTotalXp">0</p><p data-student="" value="" class="userXp" name="user' + ii + '"></p></td></tr>');
            }
            // $('.facilitatorFieldset').append('</table></div>');
        }
        $('#hangout-tab-1').css('display', 'block');

        //get users from that group and display them
        function displayUser(x) {

            var groupUser = '';
            var url = '../php/get_selected_group_users.php';
            var params = 'user=' + selectedGroup.users[x] + '&module=' + selectedGroup.moduleId;
            var classNumber = x - 1;
            function reqUser() {
                var y = JSON.parse(this.responseText);

                groupUser = y['0'];
                if (y['1'] == 'no_detailed_xps') {
                    userPoints = {
                        hangout_skill1: "0",
                        hangout_skill2: "0",
                        hangout_skill3: "0",
                        hangout_skill4: "0",
                        hangout_skill5: "0",
                        hangout_skill6: "0",
                        hangout_skill7: "0",
                        hangout_skill8: "0",
                        listening1: "0",
                        listening2: "0",
                        listening3: "0",
                        listening4: "0",
                        listening5: "0",
                        listening6: "0",
                        listening7: "0",
                        listening8: "0",
                        mission_accomp1: "0",
                        mission_accomp2: "0",
                        mission_accomp3: "0",
                        mission_accomp4: "0",
                        mission_accomp5: "0",
                        mission_accomp6: "0",
                        mission_accomp7: "0",
                        mission_accomp8: "0",
                        mission_skill1: "0",
                        mission_skill2: "0",
                        mission_skill3: "0",
                        mission_skill4: "0",
                        mission_skill5: "0",
                        mission_skill6: "0",
                        mission_skill7: "0",
                        mission_skill8: "0",
                        oral_expr1: "0",
                        oral_expr2: "0",
                        oral_expr3: "0",
                        oral_expr4: "0",
                        oral_expr5: "0",
                        oral_expr6: "0",
                        oral_expr7: "0",
                        oral_expr8: "0",
                        participation1: "0",
                        participation2: "0",
                        participation3: "0",
                        participation4: "0",
                        participation5: "0",
                        participation6: "0",
                        participation7: "0",
                        participation8: "0",
                        ponctuality1: "0",
                        ponctuality2: "0",
                        ponctuality3: "0",
                        ponctuality4: "0",
                        ponctuality5: "0",
                        ponctuality6: "0",
                        ponctuality7: "0",
                        ponctuality8: "0",
                        presence1: "0",
                        presence2: "0",
                        presence3: "0",
                        presence4: "0",
                        presence5: "0",
                        presence6: "0",
                        presence7: "0",
                        presence8: "0",
                        writing1: "0",
                        writing2: "0",
                        writing3: "0",
                        writing4: "0",
                        writing5: "0",
                        writing6: "0",
                        writing7: "0",
                        writing8: "0"
                    };
                    userPointsTotal = 0;
                } else {
                    userPoints = y['1'];
                    userPointsTotal = Number(y['2']);
                }
                if (groupUser != undefined) {
                    arbitrary = Number(groupUser.xp);
                    $('.user' + x).css("display", "block");
                    if (groupUser.name !== '') {
                        $('.userName[name="user' + x + '"]').html(groupUser.name);
                    } else {
                        $('.userName[name="user' + x + '"]').html(groupUser.email);
                    }
                    $('.userXp[name="user' + x + '"]').html(userPointsTotal + arbitrary);
                    $('.userXp[name="user' + x + '"]').attr('data-student', selectedGroup.users[x]);
                    $('.userXp[name="user' + x + '"]').attr('value', userPointsTotal + arbitrary);
                    $('.userTotalXp[name="user' + x + '"]').attr('data-student', selectedGroup.users[x]);
                    $('.user' + x).find('input').attr('data-student', selectedGroup.users[x]);

                    for (var i = 0; i < 9; i++) {
                        $('#hangout-tab-' + i).find("[data-btn='presence'][data-student='" + selectedGroup.users[x] + "']").attr('value', userPoints['presence' + i]);
                        $('#hangout-tab-' + i).find("[data-btn='ponctuality'][data-student='" + selectedGroup.users[x] + "']").attr('value', userPoints['ponctuality' + i]);
                        $('#hangout-tab-' + i).find("[data-btn='participation'][data-student='" + selectedGroup.users[x] + "']").attr('value', userPoints['participation' + i]);				//here
                        $('#hangout-tab-' + i).find("[data-btn='oral_expr'][data-student='" + selectedGroup.users[x] + "']").val(userPoints['oral_expr' + i]);						//here
                        $('#hangout-tab-' + i).find("[data-btn='hangout_skill'][data-student='" + selectedGroup.users[x] + "']").val(userPoints['hangout_skill' + i]);				//here
                        $('#hangout-tab-' + i).find("[data-btn='listening'][data-student='" + selectedGroup.users[x] + "']").val(userPoints['listening' + i]);						//here
                        $('#hangout-tab-' + i).find("[data-btn='mission_accomp'][data-student='" + selectedGroup.users[x] + "']").attr('value', userPoints['mission_accomp' + i]);
                        $('#hangout-tab-' + i).find("[data-btn='writing'][data-student='" + selectedGroup.users[x] + "']").val(userPoints['writing' + i]);							//here
                        $('#hangout-tab-' + i).find("[data-btn='mission_skill'][data-student='" + selectedGroup.users[x] + "']").val(userPoints['mission_skill' + i]);				//and here

                        if (userPoints['presence' + i] == 5) {
                            $('#hangout-tab-' + i).find("[data-btn='presence'][data-student='" + selectedGroup.users[x] + "']").addClass('buttonSelected');
                        }
                        if (userPoints['ponctuality' + i] == 5) {
                            $('#hangout-tab-' + i).find("[data-btn='ponctuality'][data-student='" + selectedGroup.users[x] + "']").addClass('buttonSelected');
                        }
                        if (userPoints['mission_accomp' + i] == 20) {
                            $('#hangout-tab-' + i).find("[data-btn='mission_accomp'][data-student='" + selectedGroup.users[x] + "']").addClass('buttonSelected');
                        }
                        if (
                            userPoints['presence' + i] == 5 &&
                            userPoints['ponctuality' + i] == 5 &&
                            userPoints['participation' + i] == 20 &&
                            userPoints['oral_expr' + i] == 25 &&
                            userPoints['hangout_skill' + i] == 10 &&
                            userPoints['listening' + i] == 20
                        ) {
                            $('#hangout-tab-' + i).find("[data-btn='h_all'][data-student='" + selectedGroup.users[x] + "']").addClass('buttonSelected');
                            $('#hangout-tab-' + i).find("[data-btn='h_all'][data-student='" + selectedGroup.users[x] + "']").attr('value', 1);
                        } else {
                            $('#hangout-tab-' + i).find("[data-btn='h_all'][data-student='" + selectedGroup.users[x] + "']").removeClass('buttonSelected');
                            $('#hangout-tab-' + i).find("[data-btn='h_all'][data-student='" + selectedGroup.users[x] + "']").attr('value', 0);
                        }
                        if (
                            userPoints['mission_accomp' + i] == 20 &&
                            userPoints['writing' + i] == 40 &&
                            userPoints['mission_skill' + i] == 25
                        ) {
                            $('#hangout-tab-' + i).find("[data-btn='m_all'][data-student='" + selectedGroup.users[x] + "']").addClass('buttonSelected');
                            $('#hangout-tab-' + i).find("[data-btn='m_all'][data-student='" + selectedGroup.users[x] + "']").attr('value', 1);
                        } else {
                            $('#hangout-tab-' + i).find("[data-btn='m_all'][data-student='" + selectedGroup.users[x] + "']").removeClass('buttonSelected');
                            $('#hangout-tab-' + i).find("[data-btn='m_all'][data-student='" + selectedGroup.users[x] + "']").attr('value', 0);
                        }
                        findTotal('hangout-tab-' + i, selectedGroup.users[x]);
                    }

                }

            }
            var oReq = new XMLHttpRequest();
            oReq.onload = reqUser;
            oReq.open("get", url + "?" + params, true);
            oReq.send();
        }

        for (var oo = 0; oo < selectedGroup.users.length; oo++) {
            displayUser(oo);
        }
    }
}
*/
