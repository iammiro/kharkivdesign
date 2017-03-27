const percentLoad = true;

let loaded = false;

window.onload = () => {
    loaded = true;
};

$(() => {

    const $preloader = $('.preloader');
    const $preloaderText = $preloader.find('.preloader__text');
    const $preloaderValue = $preloader.find('.preloader__value');

    const removeElement = ($el) => {
        $el.fadeOut(1000, () => {
            $el.remove();
        });
    };

    if (percentLoad) {

        $('body').imagesLoaded()
            .always((instance) => {
                removeElement($preloader);
                console.log('always', instance);
            })
            .done((instance) => {
                console.log('done', instance);

            })
            .fail((instance) => {
                console.log('fail', instance);
            })
            .progress((instance, image) => {

                const percentage = Math.round(100 / instance.images.length * instance.progressedCount);
                $preloaderValue.text(percentage + '%');
                const size = 30 + percentage;
                $preloaderText.css('width', size + 'px').css('height', size + 'px');
                console.log('progress', percentage);
            });
    } else {
        if (loaded) {
            removeElement($preloader)
        } else {
            $(window).on('load', () => {
                removeElement($preloader)
            });
        }

        setTimeout(() => {
            removeElement($preloader)
        }, 2000);
    }

});