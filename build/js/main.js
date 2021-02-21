AOS.init({
    duration: 800,
    easing: 'slide',
    once: true
});

$(document).ready(function () {

    $(window).stellar({
        responsive: false,
        parallaxBackgrounds: true,
        parallaxElements: true,
        horizontalScrolling: false,
        hideDistantElements: false,
        scrollProperty: 'scroll'
    });

    // site-page: show/hide main-header by scrolling
    $(window).scroll(function () {

        let $w = $(this),
            st = $w.scrollTop(),
            mainHeader = $('.main-header');

        if (st > 150) {
            mainHeader.addClass('main-header_scrolled');
        } else {
            mainHeader.removeClass('main-header_scrolled');
        }

        if (st > 350) {
            mainHeader.addClass('main-header_show');
        } else {
            mainHeader.removeClass('main-header_show');
        }

        if (st > 160) {

            if (mainHeader.hasClass('main-header_show')) {
                mainHeader.addClass('main-header_sleep');
            }

        } else {
            mainHeader.removeClass('main-header_sleep');
        }
    });

    // site-page: show/hide main-header for mobile screen
    $('#siteNavToggle').on('click', function () {

        $('#siteNav').toggleClass('main-header__nav_mobile-show');
    });

    $('#siteNavClose').on('click', function () {

        $('#siteNav').removeClass('main-header__nav_mobile-show');
    });

    // tooltip init
    $('[data-toggle="tooltip"]').tooltip();

    // mask for phone
    $('.input-phone').inputmask({"mask": "+7 ( 999 ) 999 - 99 - 99"});

    // mask for date
    $('.input-date').inputmask({"mask": "99.99.9999"});

    // collapsing of admin-sidebar
    $(document).on('click', '#topbarToggle', function () {
        let adminContainer = $('#adminLayout');

        if ($(window).width() > 768) {
            adminContainer.removeClass('sidebar-mobile-show').toggleClass('sidebar-collapsed');
        } else {
            adminContainer.removeClass('sidebar-collapsed').toggleClass('sidebar-mobile-show');
        }
    });

    // list sortable
    $('.list-sortable').sortable({
        handle: '.drag-handler',
        onDrop: function ($item, container, _super, event) {
            $item.removeClass('dragged');
            $item.removeAttr('style');
            $("body").removeClass('dragging');
            $item.closest('.list-sortable').find('.list-sortable__item-index').each(function (i) {
                let itemIndex = i + 1;
                $(this).html(itemIndex + '');
            });
        }
    });

    // sweet alert - удаление услуги
    $('#removeService').on('click', function () {
        Swal.fire({
            heightAuto: false,
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-lg btn-warning mr-4',
                cancelButton: 'btn btn-lg btn-secondary'
            },
            icon: 'warning',
            title: 'Удаление услуги',
            text: 'Безвозвратное удаление данных',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
                'Удалить',
            cancelButtonText:
                'Отмена',
        });
    });

    // sweet alert - удаление картинки
    $('.action-remove-img').on('click', function () {
        Swal.fire({
            heightAuto: false,
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-lg btn-warning mr-4',
                cancelButton: 'btn btn-lg btn-secondary'
            },
            icon: 'warning',
            title: 'Удаление картинки',
            text: 'Безвозвратное удаление данных',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
                'Удалить',
            cancelButtonText:
                'Отмена',
        });
    });

    // sweet alert - удаление отзыва
    $('#removeReview').on('click', function () {
        Swal.fire({
            heightAuto: false,
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-lg btn-warning mr-4',
                cancelButton: 'btn btn-lg btn-secondary'
            },
            icon: 'warning',
            title: 'Удаление отзыва',
            text: 'Безвозвратное удаление данных',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
                'Удалить',
            cancelButtonText:
                'Отмена',
        });
    });

    // sweet alert - удаление статьи
    $('#removeArticle').on('click', function () {
        Swal.fire({
            heightAuto: false,
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-lg btn-warning mr-4',
                cancelButton: 'btn btn-lg btn-secondary'
            },
            icon: 'warning',
            title: 'Удаление статьи',
            text: 'Безвозвратное удаление данных',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
                'Удалить',
            cancelButtonText:
                'Отмена',
        });
    });

    // FORM VALIDATION

    // function for form validation, return boolean
    function customFormValidation(event, form) {

        let isValidForm = form.checkValidity();

        if (isValidForm === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');

        return isValidForm;
    }

    // succsess alert for saving data
    function showSaveDataAlertSuccess() {
        Swal.fire({
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-lg btn-primary',
                cancelButton: 'btn btn-lg btn-secondary'
            },
            icon: 'success',
            title: 'Успешно!',
            text: 'Данные успешно сохранены',
            showConfirmButton: false,
            showCancelButton: true,
            focusConfirm: false,
            cancelButtonText: 'OK'
        });
    }

    // error alert for saving data
    function showSaveDataAlertError() {
        Swal.fire({
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-lg btn-primary',
                cancelButton: 'btn btn-lg btn-secondary'
            },
            icon: 'error',
            title: 'Oшибка',
            text: 'При сохранении данных произошла ошибка',
            showConfirmButton: false,
            showCancelButton: true,
            focusConfirm: false,
            cancelButtonText: 'Закрыть'
        });
    }

    // form validation by click on button
    $('.btn-form-validation').on('click', function (event) {
        let formId = $(this).attr('data-formId');
        let form = document.getElementById(formId);
        let loader = $('.admin-main__loader');

        let isValidForm = customFormValidation(event, form);

        if (isValidForm) {
            loader.show();

            setTimeout(function () {

                loader.hide();

                showSaveDataAlertSuccess();

            }, 3000);
        }

    });

    // summernote editor init
    if ($('.summernote').length) {
        $('.summernote').summernote({
            lang: 'ru-RU',
            dialogsInBody: true,
            minHeight: 180,
            styleTags: [
                {title: 'Абзац', tag: 'p', value: 'p'},
                {title: 'Заголовок', tag: 'h5', value: 'h5'},
                {title: 'Подзаголовок', tag: 'h6', value: 'h6'}
            ],
            toolbar: [
                ['action', ['undo', 'redo']],
                ['style', ['style']],
                ['font', ['bold', 'italic', 'underline']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['font', ['superscript', 'subscript']],
                ['table', ['table']],
                ['insert', ['link', 'picture']],
                'hr',
                ['view', ['codeview']]
            ],
            callbacks: {
                onPaste: function (e) {
                    var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');

                    e.preventDefault();

                    // Firefox fix
                    setTimeout(function () {
                        document.execCommand('insertText', false, bufferText);
                    }, 10);
                }
            }
        });
    }

    // show/hide password
    if ($('.input-password')) {
        $('.input-password').password({
            append: 'right',
            iconShow: 'icon-eye',
            iconHide: 'icon-eye-slash',
            tooltip: 'Показать/скрыть пароль',
            debug: false
        });
    }

    // button scroll to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('#scrollup').fadeIn();
        } else {
            $('#scrollup').fadeOut();
        }
    });

    $('#scrollup').on('click', function () {
        $('html, body').animate({scrollTop: 0});
        return false;
    });

    // justifiedGallery init for gallary
    $("#siteGallery").justifiedGallery();

    // fancybox init for gallary
    if ($('[data-fancybox="gallery"]').length) {
        $('[data-fancybox="gallery"]').fancybox({
            buttons: [
                "zoom",
                "slideShow",
                "close"
            ],
        });
    }

    // slider with photos
    if ($('.owl-carousel-thumbs').length) {
        $('.owl-carousel-thumbs').owlCarousel({
            center: false,
            items: 1,
            loop: true,
            stagePadding: 0,
            margin: 0,
            autoplay: true,
            autoplayHoverPause: true,
            dots: false,
            nav: true,
            navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
            responsive: {
                600: {
                    margin: 0,
                    nav: true,
                    items: 2
                },
                1000: {
                    margin: 0,
                    stagePadding: 0,
                    nav: true,
                    items: 3
                },
                1200: {
                    margin: 0,
                    stagePadding: 0,
                    nav: true,
                    items: 4
                }
            }
        });
    }

    // slider feedbacks
    if ($('.owl-carousel-feedbacks').length) {
        $('.owl-carousel-feedbacks').owlCarousel({
            center: false,
            items: 1,
            loop: true,
            stagePadding: 0,
            margin: 0,
            autoplay: true,
            autoplayHoverPause: true,
            dots: true,
            nav: true,
            navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
        });
    }

    // upload file by click a button
    $('.btn-file-upload').on('click', function () {
        let inputId = $(this).attr('data-input-file');

        $('#' + inputId).click();
    });

    function addImagesInPreviewList(files, previewList) {
        let flag = false;

        for (let i = 0; i < files.length; i++) {
            if (files[i].type === 'image/jpeg' || files[i].type === 'image/png') {

                flag = true;

                let fileLink = window.URL.createObjectURL(files[i]);

                let newPreviewItem = $('<li>', {
                    class: 'list-sortable__item'
                });

                let newPreviewItemIndex = $('<span>', {
                    class: 'list-sortable__item-index',
                });

                let dragHandler = $('<span>', {
                    class: 'drag-handler icon-arrows',
                });

                let remover = $('<span>', {
                    class: 'list-sortable__item-remove',
                    'data-toggle': 'tooltip',
                    'data-placement': 'left',
                    title: 'Удалить'
                });

                let cardThumb = $(`<div class="card-thumb">
                        <div class="card-thumb__img">
                            <img src="${fileLink}" alt="грузоперевозки">
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="text" placeholder="Подпись к фото" value="Грузоперевозки" required>
                            <div class="invalid-feedback">
                                Необходимо заполнить
                            </div>
                        </div>
                    </div>`)

                newPreviewItem.append(newPreviewItemIndex).append(dragHandler).append(remover).append(cardThumb);
                previewList.prepend(newPreviewItem);
            }
        }

        if (flag) {
            previewList.find('.list-sortable__item-index').each(function (i) {
                let itemIndex = i + 1;
                $(this).html(itemIndex + '');
            });

            $('[data-toggle="tooltip"]').tooltip();
        }
    }

    // админка - галерея, добавление нового элемента для слайдера
    $('[data-input-upload="multiImagesUpload"]').on('change', function () {
        let files = $(this)[0].files;
        let previewList = $(`#${$(this).attr('data-preview-list')}`);

        addImagesInPreviewList(files, previewList);
    });

    // dropzone for file upload
    if ($('.custom-dropzone').length) {
        let body = $('body');
        let dropArea = $('.custom-dropzone__container');

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
            dropArea[0].addEventListener(eventName, preventDefaults, false);
            body[0].addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(function (eventName) {
            dropArea[0].addEventListener(eventName, highlight, false);
            dropArea[0].addEventListener(eventName, active, false);
        });

        ['dragleave', 'drop'].forEach(function (eventName) {
            dropArea[0].addEventListener(eventName, unhighlight, false);
        });

        function highlight(e) {
            dropArea.addClass('highlight');
        }

        function unhighlight(e) {
            dropArea.removeClass('highlight');
        }

        function active(e) {
            dropArea.addClass('active');
        }

        function unactive(e) {
            dropArea.removeClass('active');
        }

        dropArea[0].addEventListener('drop', handleDrop, false);
        dropArea[0].addEventListener('drop', unactive, false);

        function handleDrop(e) {
            let dt = e.dataTransfer;
            let files = dt.files;

            console.log(this);

            let input = $(this).find('.custom-dropzone__input-file')
            let previewList = $(`#${input.attr('data-preview-list')}`);

            addImagesInPreviewList(files, previewList);
        }
    }

    // sweet alert - удаление элемента списка
    $(document).on('click', '.list-sortable__item-remove', function () {
        let el = $(this).closest('.list-sortable__item');
        let previewList = $(this).closest('.list-sortable');

        Swal.fire({
            heightAuto: false,
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-lg btn-warning mr-4',
                cancelButton: 'btn btn-lg btn-secondary'
            },
            icon: 'warning',
            title: 'Удаление элемента',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Удалить',
            cancelButtonText: 'Отмена',
        }).then((result) => {
            if (result.isConfirmed === true) {
                el.remove();

                previewList.find('.list-sortable__item-index').each(function (i) {
                    let itemIndex = i + 1;
                    $(this).html(itemIndex + '');
                });
            }
        });
    });

    if ($("#datatable-buttons").length) {
        let dataTable = $("#datatable-buttons").DataTable({
            lengthChange: !1,
            "columnDefs": [ {
                "targets": 3,
                "sortable": false
            } ],
            language: {
                processing: "Подождите...",
                search: "Поиск:",
                lengthMenu: "Показать _MENU_ записей",
                info: "Записи с _START_ до _END_ из _TOTAL_ записей",
                infoEmpty: "Записи с 0 до 0 из 0 записей",
                infoFiltered: "(отфильтровано из _MAX_ записей)",
                loadingRecords: "Загрузка записей...",
                zeroRecords: "Записи отсутствуют.",
                emptyTable: "В таблице отсутствуют данные",
                paginate: {
                    previous: "<i class='icon-angle-left'>",
                    next: "<i class='icon-angle-right'>"
                }
            },
            "order": [[ 0, "desc" ]],
            drawCallback: function() {
                $(".dataTables_paginate > .pagination").addClass("pagination-sm")
            },
            buttons: ["copy", "pdf"]

        });

        dataTable.buttons().container().appendTo("#datatable-buttons_wrapper .col-md-6:eq(0)");
    }

    // Карта в блоке контактов
    if ($('#mapOffice').length) {
        ymaps.ready(function () {
            let myMap = new ymaps.Map("mapOffice", {
                center: [56.034948, 92.901278],
                zoom: 14,
                controls: []
            });

            let myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                balloonContent: '<div class="fs-12">Красноярск</div><div class="fs-11">Взлетная 28, <br> пом.187, офис 202</div>'
            }, {
                hideIconOnBalloonOpen : false,
                balloonPane: 'outerBalloon',
                balloonOffset:[0,-40],
                iconLayout: 'default#image',
                iconImageHref: './img/logo-icon.png',
                iconImageSize: [34, 38]
            })

            myMap.geoObjects.add(myPlacemark);

            myPlacemark.balloon.open();
        });
    }

});