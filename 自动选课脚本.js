// ==UserScript==
// @name         自动选课脚本
// @namespace    https://github.com/lyy0709/select_course
// @version      1.2
// @description  在输入框中输入需要选择的课程点击开始选课即可抢课（确保已经搜索到课程）
// @author       lyy0709
// @match        https://bk.cup.edu.cn/course-selection/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let interval;

    // 创建输入框和按钮
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = '输入课程名称';

    const button = document.createElement('button');
    button.textContent = '开始选课';

    document.body.prepend(button);
    document.body.prepend(input);

    button.addEventListener('click', () => {
        // 获取输入的课程名称
        const targetCourseName = input.value.trim();
        if (!targetCourseName) {
            alert('请输入课程名称');
            return;
        }

        interval = setInterval(() => {
            // 获取所有课程名称元素
            const courseElements = document.querySelectorAll('.course-name');

            // 找到目标课程名称对应的元素
            let selectButton;
            courseElements.forEach(course => {
                if (course.textContent.includes(targetCourseName)) {
                    // 获取对应的选课按钮
                    selectButton = course.closest('tr').querySelector('button.course-select');
                }
            });

            if (selectButton) {
                // 点击选课按钮
                selectButton.click();
                console.log("已尝试选课");
                // 检查按钮文本是否变为“退课”
                if (selectButton.textContent.includes('退课')) {
                    console.log("选课成功，停止选课");
                    clearInterval(interval);
                }
            }

        }, 2000); // 每隔2000毫秒（2秒）执行一次
    });

})();