$(document).ready(function () {
    //select language
    $('.language_select').select2({
        minimumResultsForSearch: Infinity,
        // dropdownParent: $('.language'),
    });

    //all select
    $('.select_add').select2({
        minimumResultsForSearch: Infinity,
        theme: 'stylization',
    });

    // select shop
    $('.select_shop').select2({
        minimumResultsForSearch: Infinity,
        theme: 'shop',
    });

    // modals
    const body = document.querySelector('body');
    let getScrollWidth = () => window.innerWidth - document.documentElement.offsetWidth;
    let browserScrollWidth = getScrollWidth();

    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('[data-open-modal]')) {
            e.preventDefault();
            const targetId = target.closest('[data-open-modal]').dataset.openModal;
            const selectedModal = document.querySelector(`[data-modal="${targetId}"]`);
            selectedModal.classList.add('show');
            body.classList.add('locked');
            if (getScrollWidth() == 0) {
                body.style.paddingRight = `${browserScrollWidth}px`;
            }
        }
        if (target.closest('[data-modal-close]')) {
            e.preventDefault();
            let modalOpen = document.querySelector('.modal.show');
            document.querySelector('.modal.show').classList.remove('show');
            body.classList.remove('locked');
            body.style.paddingRight = ``;
        }
        if (target.closest('.modal') && !target.closest('.modal-content')) {
            e.preventDefault();
            let modalOpen = document.querySelector('.modal.show');
            document.querySelector('.modal.show').classList.remove('show');
            body.classList.remove('locked');
            body.style.paddingRight = ``;
        }
    });

    $('.profit_hide').on("click", function () {
        $(this).toggleClass('active')
        let hideElem = $(this).parents('.wallet_card').find('.wallet_card_balans .number');
        var hideElemText = hideElem.text();
        console.log(hideElemText);
        if (!hideElemText.indexOf("*")) {
            hideElem.text(hideElem.attr("data-text"));
            hideElem.removeClass('active');
            return;
        }
        var starText = "";
        for (let i = 0; i < hideElemText.length; i++) starText += "*";
        hideElem
            .attr("data-text", hideElemText)
            .addClass('active')
            .text(starText);
    });


    // Generate a password string
    function randString(id) {
        var dataSet = $(id).attr('data-character-set').split(',');
        var possible = '';
        if ($.inArray('a-z', dataSet) >= 0) {
            possible += 'abcdefghijklmnopqrstuvwxyz';
        }
        if ($.inArray('A-Z', dataSet) >= 0) {
            possible += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        if ($.inArray('0-9', dataSet) >= 0) {
            possible += '0123456789';
        }
        if ($.inArray('#', dataSet) >= 0) {
            possible += '![]{}()%&*$#^<>~@|';
        }
        var text = '';
        for (var i = 0; i < $(id).attr('data-size'); i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    // Create a new password on page load
    $('.generate').each(function () {
        $(this).val(randString($(this)));
    });


    // Create a new password
    $(".getNewPass").on("click", function () {
        var field = $(`.form-control[id="${$(this).attr('data-generate')}"`);
        field.val(randString(field));
    });

    // Auto Select Pass On Focus
    $('.generate').on("click", function () {
        $(this).select();
    });


    //открытие данных в таблице
    $('.info_open').on('click', function () {
        $(this).parents('.tr_show').toggleClass('active');
        $(this).parents('.tr_show').next('.tr_hide').find('.table_tbody_bottom').slideToggle();
    });

    $('.info_open_mobile').on('click', function () {
        $(this).parents('.tr_hide').find('.table_tbody_bottom').slideToggle();
        $(this).parents('.tr_hide').prev('.tr_show').toggleClass('active');
        $(this).toggleClass('active');
    });

    //слайдер магазинов в header
    const shopSlider = new Swiper('.shop_slider', {
        autoplay: {
            delay: 3000,
        },
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 600,
        watchOverflow: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        effect: "fade",
        pagination: {
            el: '.circle-pagination',
            type: 'bullets',
            clickable: true,
        },

        on: {
            afterInit: function () {
                const SliderPagination = document.querySelectorAll(
                    '.circle-pagination .swiper-pagination-bullet');
                for (let index = 0; index < SliderPagination.length; index++) {
                    const element = SliderPagination[index];
                    element.innerHTML = `<svg class="spinner" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="19" fill="none" stroke-width="15"></circle></svg>`;
                }
            },
        },
    });

    //слайдер магазинов 
    const shopSliderTwoItem = document.querySelector(".shop_list_slider");
    if (shopSliderTwoItem) {
        const shopSliderTwo = new Swiper('.shop_list_slider', {
            slidesPerView: 'auto',
            spaceBetween: 24,
            speed: 600,
            watchOverflow: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            grabCursor: true,
            navigation: {
                nextEl: '.shop_slider_arrows_next',
                prevEl: '.shop_slider_arrows_prev',
            },
            pagination: {
                type: 'bullets',
                clickable: true,
            },
            on: {
                //убираем after
                transitionEnd(slider) {
                    slider.isEnd ? slider.el.classList.add('end') : slider.el.classList.remove('end');
                },
                //долистываем до активного слайдера
                click(slider, event) {
                    const clickedSlide = event.target.closest('.shop_list_slider .swiper-slide');
                    if (clickedSlide) {
                        document.querySelector('.shop_list_slider .swiper-slide.active').classList.remove('active');
                        clickedSlide.classList.add('active');
                        const slideIndex = slider.slides.indexOf(clickedSlide);
                        slider.slideTo(slideIndex, 800);
                    }
                }
            }
        });

        //tabs
        const tabsItem = $('.tabs_slide_content .tabs_slide_item');
        tabsItem.hide().filter(':first').show();

        // Клики по вкладкам
        $('.tabs_slide_nav_item').click(function (e) {
            e.preventDefault();
            tabsItem.hide();
            tabsItem.filter(this.hash).show();
            $('.tabs_slide_nav .tabs_slide_nav_item').parent().removeClass('active');
            $(this).parent().addClass('active');
            return false;
        }).filter(':first').click();
    }

    //столбчатая диаграмма
    // Получить кол-во дней в месяце
    function dayQuantity() {
        var today = new Date();
        var month = today.getMonth();
        const daysInMonth = new Date(month + 1, today.getFullYear(), 0).getDate();
        const daysArr = [];
        for (let index = 0; index <= daysInMonth; index++) {
            daysArr.push(index + 1)
        }
        return daysArr;
    }

    let day = dayQuantity()

    let dayData = [80, 6, 0, 147, 367, 88, 73, 289, 457, 35, 35, 673, 135, 13, 158, 245, 12, 12, 45, 64, 95, 135, 367, 578, 224, 158, 11, 146, 258, 25, 89];

    var options = {
        chart: {
            height: 90,
            type: 'bar',
            stacked: !0,
            toolbar: {
                show: !1
            }
        },
        grid: {
            show: !1,
            padding: {
                left: 0,
                right: 0,
                top: -25,
                bottom: 0
            }
        },
        plotOptions: {
            bar: {
                horizontal: !1,
                columnWidth: "50%",
                borderRadius: 2,
                startingShape: "rounded",
                endingShape: "flat"
            }
        },
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        series: [{
            name: '',
            data: dayData
        }],
        xaxis: {
            categories: day,
            axisBorder: {
                show: !1
            },
            axisTicks: {
                show: !1
            },
            position: 'bottom',
            labels: {
                show: false,
                style: {
                    colors: [],
                    fontSize: '0',
                }
            }
        },
        fill: {
            colors: ["#00CA8B"]
        },
        yaxis: {
            show: false
        },
        tooltip: {
            x: {
                show: false
            }
        }
    };

    const chartBarElem = document.querySelector("#chart")
    if (chartBarElem) {
        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    }

    //листаем мышкой круговые диаграммы
    const slider = document.querySelector('.receipts_quantity_list');
    let isDown = false;
    let startX;
    let scrollLeft;
    if (slider) {
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    //календарь
    const datapiskers = document.querySelectorAll('.date_input_input');

    datapiskers.forEach(datapisker => {
        let datapickerGrid;
        if (window.innerWidth <= 768) {
            datapickerGrid = 1;
        } else {
            datapickerGrid = 2;
        }
        const picker = new easepick.create({
            element: datapisker,
            css: [
                "templates/src/vendors/easepick/index.css",
                "templates/src/vendors/easepick/customize_sample.css",
            ],
            setup(picker) {
                picker.on('select', (e) => {
                    this.element.parentNode.classList.add('completed');
                    this.element.parentNode.querySelector('.date_input_clear').classList.add('show');
                });
                picker.on('clear', (e) => {
                    this.element.parentNode.querySelector('.date_input_clear')

                });
            },
            lang: 'ru-US',
            format: "DD MM YYYY",
            zIndex: 10,
            grid: datapickerGrid,
            calendars: datapickerGrid,
            RangePlugin: {
                delimiter: "  —  "
            },
            locale: {
                previousMonth: '<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 8.5L1.5 5L4.5 1.5" stroke="#B9B9B9" stroke-width="1.5" stroke-linecap="round"/></svg>',
                nextMonth: '<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 8.5L4.5 5L1.5 1.5" stroke="#B9B9B9" stroke-width="1.5" stroke-linecap="round"/></svg>',
            },
            plugins: [
                "RangePlugin",
            ],
        });
        $(".date_input_clear").on("click", function () {
            const pickerBtnParentInput = this.parentNode.querySelector('.date_input_input');
            if (picker.options.element == pickerBtnParentInput) {
                picker.clear();
                this.parentNode.classList.remove('completed');
                $(this).remove()
            }
        });
    })

    //слайдер в header, активируется на мобилке
    let swiperWalletItem = $('.swiper_wallet');

    var swiperWallet = new Swiper(".swiper_wallet", {
        slidesPerView: "auto",
        spaceBetween: 16,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        nested: true,
        freeMode: true,
        breakpoints: {
            680: {
                spaceBetween: 24,
            },
        },
    });

    if (swiperWalletItem) {
        function swiperWalletFunc() {
            if ($(window).width() <= 680) {
                swiperWallet.enable();
            } else {
                swiperWallet.disable();
            }
        }
        swiperWalletFunc();

        $(window).on('resize', function () {
            swiperWalletFunc();
        });
    }


    /***********************************************************/
    /********************Doughnut chart*************************/
    /************************************************************/
    function countElementArray(count) {
        const array = [4];
        for (let i = 0; i < count - 1; i++) {
            array.push(1);
        }
        return array;
    }

    //Total

    function doughnutMainChartCreate(id, name, values, share, colors, text, topText) {
        const ctxTotal = document.getElementById(id).getContext('2d');
        ctxTotal.canvas.parentNode.style.height = '120px';
        ctxTotal.canvas.parentNode.style.width = '120px';
        let borderWidth = countElementArray(values.length);
        const data = {
            labels: [

            ],
            datasets: [{
                /*label: 'My First Dataset',*/
                data: values,
                borderWidth: borderWidth,
                borderColor: colors,
                backgroundColor: colors,
                hoverOffset: 4,
                offset: 5
            }]
        };

        new Chart(ctxTotal, {
            type: 'doughnut',
            data: data,
            options: {
                cutoutPercentage: 85
            }
        });
        share = share + '%';
        doughnutChartLabelCreate(id, share, text, topText);
    }
    let totalChart = document.querySelector('#total-chart');
    if (totalChart) {
        doughnutMainChartCreate('total-chart', 'BotPay', [50, 25, 25, 15, 17], 50, ['#00CA8B', '#FFA800', '#5F95FF', '#5F9566', '#5F9500'], 'BotPay', '325,110');
    }

    // function create doughnut chart
    function doughnutChartNodeCreate(id, name, value, color, paymentsNumber, width = 90, height = 90) {

        let div = document.createElement('div');
        div.classList.add("receipts_quantity_item", "doughnut");
        div.innerHTML = `
            <div class="doughnut__chart" data-id=${id}>
                <canvas id=${id} width=${width} height=${height}></canvas>
            </div>
            <div class="doughnut__footer"><span style="background: ${color}"></span>${name}</div>
        `;

        let node = document.querySelector('#doughnut-charts');
        node.append(div);

        const ctx = document.getElementById(id).getContext('2d');
        ctx.canvas.parentNode.style.height = `${height}px`;
        ctx.canvas.parentNode.style.width = `${width}px`;
        const data = {
            datasets: [{
                data: [value, 100 - value],
                borderWidth: 4,
                backgroundColor: [
                    `${color}`,
                    '#E7EDEB'
                ],
                hoverOffset: 4
            }]
        };
        new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                cutoutPercentage: 75
            }
        });
        doughnutChartLabelCreate(id, paymentsNumber, text = 'оплат')
    }


    // function create label in center doughnut chart
    function doughnutChartLabelCreate(id, centerText = 0, bottomText = 'оплат', topText = '') {
        let div = document.createElement('div');
        let display = (topText === '') ? 'display: none' : 'display: block';

        div.classList.add("doughnut__label");
        div.innerHTML = `
            <p class="doughnut__top" style=${display}>${topText}</p>
            <p class='doughnut__value'>${centerText}</p>
            <p class='doughnut__text'>${bottomText}</p>`;

        let node = document.querySelector(`[data-id=${id}]`);
        node.append(div);
    }


    // function create doughnut charts
    function doughnutChartsListCreate(charts) {
        let chart;
        for (let i = 0; i < charts.length; i++) {
            chart = charts[i];
            doughnutChartNodeCreate(chart.id, chart.name, chart.value, chart.color, chart.paymentsNumber)
        }
    }

    //
    const charts = [{
            id: 'BotPay',
            name: 'botPay',
            value: 60,
            paymentsNumber: 1030,
            color: '#00CA8B'
        },
        {
            id: 'PayKassa',
            name: 'PayKassa',
            value: 20,
            paymentsNumber: 230,
            color: '#FFA800'
        },
        {
            id: 'CoinPayments',
            name: 'CoinPayments',
            value: 25,
            color: '#5F95FF'
        },
        {
            id: 'Leprosorium',
            name: 'Leprosorium',
            value: 25,
            paymentsNumber: 30,
            color: '#AF5FFF'
        },
        {
            id: 'Medium',
            name: 'Medium',
            value: 35,
            paymentsNumber: 103,
            color: '#FC5FFF'
        },

    ];
    let doughnut = document.querySelector('#doughnut-charts');
    if (doughnut) {
        doughnutChartsListCreate(charts);
    }


    //пункты меню, которые не входят, скрываются 
    function responseMenu() {
        $('.functional_menu_list_mobile li.functional_menu_item').appendTo('.functional_menu_list_desktop');
        let items = $('.functional_menu_list_desktop .functional_menu_item');
        let max_width = $('.functional_menu_list_desktop').width() - $('.functional_menu_list_desktop .functional_menu_item_dd').outerWidth();
        let width = 0;
        let hide_from = 0;


        items.css({
            'width': 'auto'
        });
        items.each(function (index) {
            if (width + $(this).outerWidth() > max_width) {
                return false;
            } else {
                hide_from = index;
                width += $(this).outerWidth();
            }
        });
        if (hide_from < items.length - 1) {
            items.eq(hide_from).nextAll('.functional_menu_item').appendTo('.functional_menu_list_mobile');
        } else {}
    }

    $(window).on('resize', function () {
        responseMenu();
    }).trigger('resize');

    //открытие меню
    $('.menu_open').on('click', function () {
        $('.mobile_menu').toggleClass('active');
        $(this).toggleClass('active');
        $('body').toggleClass('locked');
    });

    //закрытие банера
    $('.baner_close').on('click', function () {
        $(this).parents('.baner').hide();
    });

    //tabs
    const tabsItem = $('.tabs_content_item');
    tabsItem.hide().filter(':first').show();

    // Клики по вкладкам
    $('.tabs_item').click(function (e) {
        e.preventDefault();
        tabsItem.hide();
        tabsItem.filter(this.hash).show();
        $('.tabs_nav .tabs_item').removeClass('active');
        $(this).addClass('active');
        return false;
    }).filter(':first').click();

    $('.form-control').each(
        function () {
            if ($(this).attr('disabled')) {
                $(this).parent().addClass('disabled')

            }
        });

    //линейный график
    var series = {
        "prices": [
            10,
            15,
            17,
            28,
            49,
            50,
            69,
            48,
            37,
            42,
            256,
            277,
            388,
            390,
            837,
            378,
            388,
            590,
            605,
            609
        ],
        "dates": [
            "13 Nov 2022",
            "14 Nov 2022",
            "15 Nov 2022",
            "16 Nov 2022",
            "17 Nov 2022",
            "20 Nov 2022",
            "21 Nov 2022",
            "22 Nov 2022",
            "23 Nov 2022",
            "24 Nov 2022",
            "27 Nov 2022",
            "28 Nov 2022",
            "29 Nov 2022",
            "30 Nov 2022",
            "01 Dec 2022",
            "04 Dec 2022",
            "05 Dec 2022",
            "06 Dec 2022",
            "07 Dec 2022",
            "08 Dec 2022"
        ]
    }

    var options = {
        chart: {
            locales: [{
                "name": "ru",
                "options": {
                    "months": [
                        "Январь",
                        "Февраль",
                        "Март",
                        "Апрель",
                        "Май",
                        "Июнь",
                        "Июль",
                        "Август",
                        "Сентябрь",
                        "Октябрь",
                        "Ноябрь",
                        "Декабрь"
                    ],
                    "shortMonths": [
                        "Янв",
                        "Фев",
                        "Мар",
                        "Апр",
                        "Май",
                        "Июн",
                        "Июл",
                        "Авг",
                        "Сен",
                        "Окт",
                        "Ноя",
                        "Дек"
                    ],
                    "days": [
                        "Воскресенье",
                        "Понедельник",
                        "Вторник",
                        "Среда",
                        "Четверг",
                        "Пятница",
                        "Суббота"
                    ],
                    "shortDays": ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                    "toolbar": {
                        "exportToSVG": "Сохранить SVG",
                        "exportToPNG": "Сохранить PNG",
                        "exportToCSV": "Сохранить CSV",
                        "menu": "Меню",
                        "selection": "Выбор",
                        "selectionZoom": "Выбор с увеличением",
                        "zoomIn": "Увеличить",
                        "zoomOut": "Уменьшить",
                        "pan": "Перемещение",
                        "reset": "Сбросить увеличение"
                    }
                }
            }],
            defaultLocale: 'ru',
            height: 240,
            type: "area",
            stacked: !0,
            toolbar: {
                show: !1
            }
        },
        grid: {
            show: true,
            borderColor: '#E7EDEB',
            strokeDashArray: 4,
            yaxis: {
                lines: {
                    show: true,
                }
            },
            xaxis: {
                lines: {
                    show: true,
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#17BD90"],
        fill: {
            colors: undefined,
            opacity: 0,
            type: 'solid',
            gradient: {
                shade: 'dark',
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 100],
                colorStops: []
            },
        },
        stroke: {
            curve: 'smooth',
            width: 2,
            dashArray: 0
        },
        series: [{
            name: '',
            data: series.prices
        }],
        labels: series.dates,
        yaxis: [{
            show: true,
            labels: {
                show: true,
                minWidth: 0,
                maxWidth: 160,
                offsetX: 0,
                offsetY: 0,
                rotate: 0,
                padding: 20,
                style: {
                    colors: ['#C4C4C4'],
                    fontSize: "12px",
                    fontFamily: '"Montserrat", sans-serif;',
                },
                // formatter: function (val, index) {
                //     return val + 'K';
                // }
            },
        }],
        xaxis: {
            type: "datetime",
            labels: {
                rotate: 0,
                style: {
                    colors: ['#C4C4C4'],
                    fontSize: "12px",
                },
                formatter: function (val) {
                    return new Date(val).toLocaleDateString('ru-RU', {
                        month: 'short',
                        day: 'numeric',
                    });
                }
            },
            tooltip: {
                enabled: false,
            }
        },
        tooltip: {
            x: {
                intersect: true,
                style: {
                    fontSize: '12px',
                    fontFamily: undefined
                },
                fixed: {
                    enabled: false,
                    position: 'topRight',
                    offsetX: 10,
                    offsetY: 10,
                },

                formatter: function (val) {
                    return new Date(val).toLocaleDateString('ru-RU', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                    });
                }
            }
        }
    };

    const chartLineElem = document.querySelector("#chart")
    if (chartLineElem) {
        var chartLine = new ApexCharts(document.querySelector("#chart_time"), options);

        chartLine.render();
    }

    //скрыть/показать пароль
    $('.password-checkbox').on('click', function () {
        let passwordInput = $(this).parents('.form__label').find('.form-control')
        if ($(this).is(':checked')) {
            $(this).parent().addClass('active');
            passwordInput.attr('type', 'text');
        } else {
            passwordInput.attr('type', 'password');
            $(this).parent().removeClass('active');
        }
    });

    //копирование в буфер
    $('.shop_ip_item_btn').on('click', function () {
        let copyText = $(this).parent().find('.shop_ip_item_text').text();
        var $tmp = $("<textarea>");
        var $copiedText = $("<span class='text_copied'>Скопированно</span>");
        $("body").append($tmp);
        $(this).parent().append($copiedText)
        $tmp.val(copyText).select();
        document.execCommand("copy");
        $tmp.remove();
        setTimeout(() => {
            $copiedText.remove();

        }, 1500);
    });
    //копирование в буфер из инпута
    $('.form_input_copy_btn').on('click', function () {
        let copyText = $(this).parent().find('.form-control');
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
    });

    //код подверждения при авторизации/рег
    var pinContainer = document.querySelector(".pin-code");
    if (pinContainer) {
        pinContainer.addEventListener('keyup', function (event) {
            var target = event.srcElement;

            var maxLength = parseInt(target.attributes["maxlength"].value, 10);
            var myLength = target.value.length;

            if (myLength >= maxLength) {
                var next = target;
                while (next = next.nextElementSibling) {
                    if (next == null) break;
                    if (next.tagName.toLowerCase() == "input") {
                        next.focus();
                        break;
                    }
                }
            }

            if (myLength === 0) {
                var next = target;
                while (next = next.previousElementSibling) {
                    if (next == null) break;
                    if (next.tagName.toLowerCase() == "input") {
                        next.focus();
                        break;
                    }
                }
            }
        }, false);

        pinContainer.addEventListener('keydown', function (event) {
            var target = event.srcElement;
            target.value = "";
        }, false);
    }

    //faq
    $('.faq_item_btn').on('click', function () {
        $(this).toggleClass('active');
        $(this).next().slideToggle();
    });

    //маска на инпут с Суммой вывода
    $('#currency-mask').on('focus', function () {
        var currencyMask = IMask(
            document.getElementById('currency-mask'), {
                mask: 'DD USDT',
                lazy: false,
                scale: 2,
                blocks: {
                    DD: {
                        mask: Number,

                    }
                }

            });
    });

});