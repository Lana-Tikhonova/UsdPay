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
        // autoplay: {
        // 	delay: 3000,
        // },
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
        on: {
            transitionEnd(slider) {
                slider.isEnd ? slider.el.classList.add('end') : slider.el.classList.remove('end');
            },
        }
    });

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

    // var optionsTwo = {
    //     series: [50, 25, 25],
    //     chart: {
    //         type: 'donut',
    //     },
    //     legend: {
    //         position: 'bottom',
    //     },
    //     responsive: [{
    //         breakpoint: 480,
    //         options: {
    //             chart: {
    //                 width: 200
    //             },
    //             legend: {
    //                 position: 'bottom'
    //             }
    //         }
    //     }]
    // };

    // var pie = new ApexCharts(document.querySelector("#pie"), optionsTwo);
    // pie.render();

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


});