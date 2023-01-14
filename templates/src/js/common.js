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
        const tabsItem = $('.tabs_content .tabs_item');
        tabsItem.hide().filter(':first').show();

        // Клики по вкладкам
        $('.tabs_nav_item').click(function (e) {
            e.preventDefault();
            tabsItem.hide();
            tabsItem.filter(this.hash).show();
            $('.tabs_nav .tabs_nav_item').parent().removeClass('active');
            $(this).parent().addClass('active');
            return false;
        }).filter(':first').click();
    }

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

    //столбчатая диаграмма
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

    //листаем мышкой круговые диаграммы
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
                    this.element.parentNode.classList.add('completed')
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
                "RangePlugin"
            ],
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
    doughnutMainChartCreate('total-chart', 'BotPay', [50, 25, 25, 15, 17], 50, ['#00CA8B', '#FFA800', '#5F95FF', '#5F9566', '#5F9500'], 'BotPay', '325,110');


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

    doughnutChartsListCreate(charts);


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

    //линейный график

    // const DATA_COUNT = 12;
    // const labels = [];
    // for (let i = 0; i < DATA_COUNT; ++i) {
    //     labels.push(i.toString());
    // }
    // const datapoints = [0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170];
    // const data = {
    //     labels: labels,
    //     datasets: [{
    //         label: 'Cubic interpolation (monotone)',
    //         data: datapoints,
    //         borderColor: 'rgba(0, 119, 204, 0.3)',
    //         fill: false,
    //         cubicInterpolationMode: 'monotone',
    //         tension: 0.4
    //     }, {
    //         label: 'Cubic interpolation',
    //         data: datapoints,
    //         borderColor: 'rgba(0, 119, 204, 0.3)',
    //         fill: false,
    //         tension: 0.4
    //     }, {
    //         label: 'Linear interpolation (default)',
    //         data: datapoints,
    //         borderColor: 'rgba(0, 119, 204, 0.3)',
    //         fill: false
    //     }]
    // };
    // const footer = (tooltipItems) => {
    //     let sum = 0;

    //     tooltipItems.forEach(function (tooltipItem) {
    //         sum += tooltipItem.parsed.y;
    //     });
    //     return 'Sum: ' + sum;
    // };
    // new Chart(document.getElementById("line-chart"), {
    //     type: 'line',
    //     data: data,
    //     options: {
    //         responsive: true,
    //         plugins: {
    //             title: {
    //                 display: true,
    //                 text: 'Chart.js Line Chart - Cubic interpolation mode'
    //             },
    //             plugins: {
    //                 tooltip: {
    //                     callbacks: {
    //                         footer: footer,
    //                     }
    //                 }
    //             }
    //         },
    //         interaction: {
    //             intersect: false,
    //         },
    //         scales: {
    //             x: {
    //                 display: true,
    //                 title: {
    //                     display: true
    //                 }
    //             },
    //             y: {
    //                 display: true,
    //                 title: {
    //                     display: true,
    //                     text: 'Value'
    //                 },
    //                 suggestedMin: -10,
    //                 suggestedMax: 200
    //             }
    //         }
    //     },
    // });

    // Chart.defaults.LineWithLine = Chart.defaults.line;
    // Chart.controllers.LineWithLine = Chart.controllers.line.extend({
    //     draw: function (ease) {
    //         Chart.controllers.line.prototype.draw.call(this, ease);

    //         if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
    //             var activePoint = this.chart.tooltip._active[0],
    //                 ctx = this.chart.ctx,
    //                 x = activePoint.tooltipPosition().x,
    //                 topY = this.chart.scales['y-axis-0'].top,
    //                 bottomY = this.chart.scales['y-axis-0'].bottom;

    //             // draw line
    //             ctx.save();
    //             ctx.beginPath();
    //             ctx.moveTo(x, topY);
    //             ctx.lineTo(x, bottomY);
    //             ctx.lineWidth = 2;
    //             ctx.strokeStyle = '#07C';
    //             ctx.stroke();
    //             ctx.restore();
    //         }
    //     }
    // });

    // var chart = new Chart(ctx, {
    //     type: 'LineWithLine',
    //     data: {
    //         labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    //         datasets: [{
    //             label: 'Statistics',
    //             data: [3, 1, 2, 5, 4, 7, 6],
    //             backgroundColor: 'rgba(0, 119, 204, 0.8)',
    //             borderColor: 'rgba(0, 119, 204, 0.3)',
    //             pointRadius: .5,
    //             pointHitRadius: 16,
    //             fill: false
    //         }]
    //     },
    //     options: {
    //         tooltips: {
    //             intersect: false
    //         },
    //         scales: {
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero: true
    //                 }
    //             }]
    //         }
    //     }
    // });


    const chartJS = new Chart(document.getElementById('ctx'), {
        type: 'line',
        data: {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            datasets: [{
                // label: 'Statistics',
                data: [17, 14, 13, 12, 9, 25, 28, 37, 39, 37, 26, 10,],
                backgroundColor: '#00CA8B',
                borderColor: '#00CA8B',
                pointRadius: .5,
                pointHitRadius: 16,
                borderWidth:2,
                fill: false
            }]
        },
        options: {
            // responsive: false,
            legend: {
                display: false
            },
            tooltips: {
                mode: "index",
                intersect: false,
                // backgroundColor:'#ffffff',
                // titleColor:'#000000',
                // bodyColor:'#000000',
                // footerColor:'#000000',
                // boxWidth:30,
                padding:'8',
                callbacks: {
                    label(tooltipItem, data) {
                        let label = data.datasets[tooltipItem.datasetIndex].label || '';

                        if (label) {
                            label += ': ';
                        }
                        return label + Math.round(tooltipItem.yLabel) + " USDT";
                    }
                }
            },
            hover: {
                mode: "index",
                intersect: false,
            },
        }
    });

    // let dates = [80, 6, 0, 147, 367, 88, 73, 289, 457, 35, 35, 673, 135, 13];

    // var optionsTwo = {
    //     series: [{
    //     name: 'XYZ MOTORS',
    //     data: dates
    //   }],
    //     chart: {
    //     type: 'area',
    //     stacked: false,
    //     height: 350,
    //     zoom: {
    //       type: 'x',
    //       enabled: true,
    //       autoScaleYaxis: true
    //     },
    //     toolbar: {
    //       autoSelected: 'zoom'
    //     }
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },
    //   markers: {
    //     size: 0,
    //   },
    //   title: {
    //     text: 'Stock Price Movement',
    //     align: 'left'
    //   },
    //   fill: {
    //     type: 'gradient',
    //     gradient: {
    //       shadeIntensity: 1,
    //       inverseColors: false,
    //       opacityFrom: 0.5,
    //       opacityTo: 0,
    //       stops: [0, 90, 100]
    //     },
    //   },
    //   yaxis: {
    //     labels: {
    //       formatter: function (val) {
    //         return (val / 1000000).toFixed(0);
    //       },
    //     },
    //     title: {
    //       text: 'Price'
    //     },
    //   },
    //   xaxis: {
    //     categories: day,
    //         axisBorder: {
    //             show: !1
    //         },
    //         axisTicks: {
    //             show: !1
    //         },
    //         position: 'bottom',
    //         labels: {
    //             show: false,
    //             style: {
    //                 colors: [],
    //                 fontSize: '0',
    //             }
    //         }
    //   },
    //   tooltip: {
    //     shared: false,
    //     y: {
    //       formatter: function (val) {
    //         return (val / 1000000).toFixed(0)
    //       }
    //     }
    //   }
    //   };

    //   var chartTwo = new ApexCharts(document.querySelector("#line"), optionsTwo);
    //   chartTwo.render();

//     // Initialize the echarts instance based on the prepared dom
//     var myChart = echarts.init(document.getElementById('main'));

//     // Specify the configuration items and data for the chart
// const data = [["2000-06-05", 116], ["2000-06-06", 129], ["2000-06-07", 135], ["2000-06-08", 86], ["2000-06-09", 73], ["2000-06-10", 85], ["2000-06-11", 73], ["2000-06-12", 68], ["2000-06-13", 92], ["2000-06-14", 130], ["2000-06-15", 245], ["2000-06-16", 139], ["2000-06-17", 115], ["2000-06-18", 111], ["2000-06-19", 309], ["2000-06-20", 206], ["2000-06-21", 137], ["2000-06-22", 128], ["2000-06-23", 85], ["2000-06-24", 94], ["2000-06-25", 71], ["2000-06-26", 106], ["2000-06-27", 84], ["2000-06-28", 93], ["2000-06-29", 85], ["2000-06-30", 73], ["2000-07-01", 83], ["2000-07-02", 125], ["2000-07-03", 107], ["2000-07-04", 82], ["2000-07-05", 44], ["2000-07-06", 72], ["2000-07-07", 106], ["2000-07-08", 107], ["2000-07-09", 66], ["2000-07-10", 91], ["2000-07-11", 92], ["2000-07-12", 113], ["2000-07-13", 107], ["2000-07-14", 131], ["2000-07-15", 111], ["2000-07-16", 64], ["2000-07-17", 69], ["2000-07-18", 88], ["2000-07-19", 77], ["2000-07-20", 83], ["2000-07-21", 111], ["2000-07-22", 57], ["2000-07-23", 55], ["2000-07-24", 60]];
// const dateList = data.map(function (item) {
//   return item[0];
// });
// const valueList = data.map(function (item) {
//   return item[1];
// });
// option = {
//   // Make gradient line here
//   visualMap: [
//     {
//       show: false,
//       type: 'continuous',
//       seriesIndex: 0,
//       min: 0,
//       max: 400
//     },
//     {
//       show: false,
//       type: 'continuous',
//       seriesIndex: 1,
//       dimension: 0,
//       min: 0,
//       max: dateList.length - 1
//     }
//   ],
//   title: [
//     {
//       left: 'center',
//       text: 'Gradient along the y axis'
//     },
//     {
//       top: '55%',
//       left: 'center',
//       text: 'Gradient along the x axis'
//     }
//   ],
//   tooltip: {
//     trigger: 'axis'
//   },
//   xAxis: [
//     {
//       data: dateList
//     },
//     {
//       data: dateList,
//       gridIndex: 1
//     }
//   ],
//   yAxis: [
//     {},
//     {
//       gridIndex: 1
//     }
//   ],
//   grid: [
//     {
//       bottom: '60%'
//     },
//     {
//       top: '60%'
//     }
//   ],
//   series: [
//     {
//       type: 'line',
//       showSymbol: false,
//       smooth: true,
//       data: valueList
//     },
//     {
//       type: 'line',
//       showSymbol: false,
//       data: valueList,
//       xAxisIndex: 1,
//       yAxisIndex: 1
//     }
//   ]
// };
//     // Display the chart using the configuration items and data just specified.
//     myChart.setOption(option);
});