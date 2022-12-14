$(document).ready(function () {
    $('.language select').select2({
        minimumResultsForSearch: Infinity,
        dropdownParent: $('.language'),
    });

    $('.select_add').select2({
        minimumResultsForSearch: Infinity,
        theme: 'stylization',
    });
    // $('.table_tbody_bottom').slideToggle(0);
    $('.info_open').on('click', function () {
        $(this).parents('.table_tbody_item').toggleClass('active');
        $(this).parents('.table_tbody_item').find('.table_tbody_bottom').slideToggle();
    });

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
    const shopSliderTwo = new Swiper('.shop_list_slider', {
        /*slidesPerView: 'auto',
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
        },*/
        slidesPerView: 1,
        spaceBetween: 10,
        simulateTouch: true,
        touchRatio: 2,
        centeredSlides: true,
        clickable: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            transitionEnd(slider) {
                slider.isEnd ? slider.el.classList.add('end') : slider.el.classList.remove('end');
            },
        }
    });

    // ???????????????? ??????-???? ???????? ?? ????????????
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
            name: '$',
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

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();


    const slider = document.querySelector('.receipts_quantity_list');
    let isDown = false;
    let startX;
    let scrollLeft;

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
                    this.element.parentNode.classList.add('completed')
                });
            },
            lang: 'ru-US',
            format: "DD MM YYYY",
            zIndex: 10,
            grid: datapickerGrid,
            calendars: datapickerGrid,
            RangePlugin: {
                delimiter: "  ???  "
            },
            locale: {
                previousMonth: '<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 8.5L1.5 5L4.5 1.5" stroke="#B9B9B9" stroke-width="1.5" stroke-linecap="round"/></svg>',
                nextMonth: '<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 8.5L4.5 5L1.5 1.5" stroke="#B9B9B9" stroke-width="1.5" stroke-linecap="round"/></svg>',
            },
            plugins: [
                "RangePlugin"
            ],
        });
    })
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
                cutout: 45,
            }
        });
        share = share + '%';
        doughnutChartLabelCreate (id, share, text, topText);
    }
    doughnutMainChartCreate('total-chart', 'BotPay', [50, 25, 25, 15, 17], 50, ['#00CA8B','#FFA800', '#5F95FF', '#5F9566', '#5F9500'], 'BotPay', '325,110');


    // function create doughnut chart


    function doughnutChartNodeCreate( id, name, value, color, paymentsNumber, width = 80, height = 80) {

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
                borderWidth: 0,
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
                cutout: 30,
            }
        });
        doughnutChartLabelCreate (id, paymentsNumber, text = '??????????')
    }


    // function create label in center doughnut chart


    function doughnutChartLabelCreate (id, centerText= 0, bottomText = '??????????', topText='') {
        let div = document.createElement('div');
        let display = (topText === '')? 'display: none': 'display: block';

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
        for ( let i = 0; i < charts.length; i++ ) {
            chart = charts[i];
            doughnutChartNodeCreate(chart.id, chart.name, chart.value, chart.color, chart.paymentsNumber )
        }
    }

   //
    const charts = [
        {
            id:'BotPay',
            name: 'botPay',
            value: 60,
            paymentsNumber: 1030,
            color: '#00CA8B'
        },
        {
            id:'PayKassa',
            name: 'PayKassa',
            value: 20,
            paymentsNumber: 230,
            color: '#FFA800'
        },
        {
            id:'CoinPayments',
            name: 'CoinPayments',
            value: 25,
            color: '#5F95FF'
        },
        {
            id:'Leprosorium',
            name: 'Leprosorium',
            value: 25,
            paymentsNumber: 30,
            color: '#AF5FFF'
        },
        {
            id:'Medium',
            name: 'Medium',
            value: 35,
            paymentsNumber: 103,
            color: '#FC5FFF'
        },

    ];

    doughnutChartsListCreate(charts);

    // Tabs
    const tabs = document.querySelectorAll('.tabs__btn');
    const tabsContent = document.querySelectorAll('.tabs__body');

    if (tabsContent.length > 0 || tabs.length > 0) {

        function hideTabContent() {
            tabsContent.forEach(item => {
                item.classList.remove('active');
            });

            tabs.forEach(item => {
                item.classList.remove('active');
            });
        }

        function showTabContent(i = 0) {
            tabsContent[i].classList.add('active');
            tabs[i].classList.add('active');
        }

        hideTabContent();
        showTabContent();

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                hideTabContent();
                showTabContent(index);
            });
        });
    }

    // function get tab index
    function tabIndex() {
        for(let i = 0; i < tabs.length; i++) {
            if(tabs[i].classList.contains('active')) {
                return i;
            }
        }
    }

    //function change tab index
    function changeIndex(item) {
        let index = tabIndex();
        if(item === '+' && index < tabs.length - 1) {
            hideTabContent();
            showTabContent(++index);
        }
        if(item === '-' && index > 0) {
            hideTabContent();
            showTabContent(--index);
        }
    }

    //Arrow button in tabs
    function arrowButtonTabs() {
        const arrowRight = document.querySelector('#arrow-right');
        const arrowLeft = document.querySelector('#arrow-left');

        arrowRight.addEventListener('click', function () {
            changeIndex('+');
        });
        arrowLeft.addEventListener('click', function () {
            changeIndex('-');
        });
    }

    arrowButtonTabs();

    //function remove inactive class
    function removeInactiveClass() {
        const arrowsBtn = document.querySelectorAll('.tabs__arrow');

        arrowsBtn.forEach(arrow => {
            if(arrow.classList.contains('tabs__arrow--inactive')){
                arrow.classList.remove('tabs__arrow--inactive');
            }
        })
    }

    // function add inactive class
    function addInactiveClass(index) {
        const arrowRight = document.querySelector('#arrow-right');
        const arrowLeft = document.querySelector('#arrow-left');

        if(index === 0) {
            arrowLeft.classList.add('tabs__arrow--inactive');
        }
        if(index === tabs.length - 1) {
            arrowRight.classList.add('tabs__arrow--inactive');
        }
    }

    addInactiveClass(tabIndex());

    // function follow the inactive arrows
    function followArrow() {
        const tabNavigation = document.querySelector('.tabs__wrapper');

        if(tabNavigation) {
            tabNavigation.addEventListener('click', function(){
                removeInactiveClass();
                addInactiveClass(tabIndex());
            });
        }
    }
    followArrow();
});