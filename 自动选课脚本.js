// ==UserScript==
// @name         自动选课脚本
// @namespace    https://github.com/lyy0709/select_course
// @version      1.2
// @description  在输入框中输入需要选择的课程点击开始选课即可抢课（确保已经搜索到课程）
// @author       lyy0709,xiaozhou26
// @match        https://bk.cup.edu.cn/course-selection/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let interval;

    function createInputAndButton() {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = '输入课程名称';

        const button = document.createElement('button');
        button.textContent = '开始选课';

        document.body.prepend(button);
        document.body.prepend(input);

        return { input, button };
    }

    const { input, button } = createInputAndButton();

    button.addEventListener('click', () => {
        const targetCourseName = input.value.trim();
        if (!targetCourseName) {
            alert('请输入课程名称');
            return;
        }

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
                    button.disabled = true;
                }
            }

        }, 2000);
    });

})();
