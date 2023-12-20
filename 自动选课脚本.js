// ==UserScript==
// @name         自动选课脚本
// @namespace    https://github.com/lyy0709/select_course,
// @version      1.3
// @description  在输入框中输入需要选择的课程点击开始选课即可抢课（确保已经搜索到课程）
// @author       lyy0709,xiaozhou26
// @match        https://bk.cup.edu.cn/course-selection/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let interval;

    function createInputAndButtons() {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = '输入课程名称';

        const startButton = document.createElement('button');
        startButton.textContent = '开始选课';

        const stopButton = document.createElement('button');
        stopButton.textContent = '停止选课';
        stopButton.disabled = true;

        document.body.prepend(stopButton);
        document.body.prepend(startButton);
        document.body.prepend(input);

        return { input, startButton, stopButton };
    }

    const { input, startButton, stopButton } = createInputAndButtons();

    startButton.addEventListener('click', () => {
        const targetCourseName = input.value.trim();
        if (!targetCourseName) {
            alert('请输入课程名称');
            return;
        }

        stopButton.disabled = false;

        interval = setInterval(() => {
            const courseElements = document.querySelectorAll('.course-name');

            const targetElement = Array.from(courseElements).find(course => course.textContent.includes(targetCourseName));

            if (targetElement) {
                const selectButton = targetElement.closest('tr').querySelector('button.course-select');
                selectButton.click();
                console.log("已尝试选课");

                if (selectButton.textContent.includes('退课')) {
                    console.log("选课成功，停止选课");
                    clearInterval(interval);
                    input.disabled = true;
                    startButton.disabled = true;
                    stopButton.disabled = true;
                } else {
                    const timeConflictElement = document.querySelector('div[role="dialog"] .result-content');
                    if (timeConflictElement && timeConflictElement.textContent.includes('时间冲突')) {
                        console.log("时间冲突，停止选课");
                        clearInterval(interval);
                        stopButton.disabled = true;
                    }
                }
            }

        }, 2000);
    });

    stopButton.addEventListener('click', () => {
        if (interval) {
            clearInterval(interval);
            console.log("已停止选课");
            stopButton.disabled = true;
        }
    });

})();
