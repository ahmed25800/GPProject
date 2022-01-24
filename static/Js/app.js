const APP_URL = 'http://127.0.0.1:8000/';
const MEDIA_URL = '/media/';
function SaveGallery(){

    let role = parseInt($('#add-gallery').attr('btnrole'));
    if(role === 1){
        $('#add-gallery').attr('btnrole' , 2)
        $('#add-gallery').html('Save');
        $('#gallery-form').show();
    }else{
        add_gallery($('#gallery_name').val());
        $('#gallery_name').attr('btnrole' , 1 );
        $('#gallery_name').html('new gallery');
        $('#gallery-form').hide();
    }
}
function add_gallery(name){
        $.ajax({
            url :'http://127.0.0.1:8000/%2Fadd_new_gallery',
            type:'POST',
            data:{name : name},
            success : function (response){
                alert('gallery added successfully')
                GetGalleries();
            }
        });
    }
    $(document).ready(function (){
        GetGalleries();
    });
    function GetGalleries(){
        let list =$('#galleries');
        list.html('');
        $.ajax({
            url: 'http://127.0.0.1:8000/%2FGalleries',
            type:'GET',
            success:function (response){

                let response_data = JSON.parse(response);

                $.each(response_data , function (index , value){
                    $('.first-gallery').removeClass('first-gallery');
                    list.prepend('<li class="first-gallery" data-val ="'+value.name+'" data-id="'+value.id+'" id="gallery_'+value.id+'">\n' +
                        '<a class="scroll-link" >'+value.name+'</a>' +
                        '</li>')
                    let gallery = $('#gallery_'+value.id);
                    gallery.click(function (){
                       GetGallery(value.id);
                    });

                });
                $('.first-gallery').click();
            }
        })
    }

    function OpenFileManager(){
        $('#ImagesInput').click();
    }

    function ChangeFiles(){
        add_images();
    }

    function add_images(){
        let form_data = new FormData($('#GalleryForm')[0]);
        let gallery_id = $('#GalleryInput').val();
        $.ajax({
            url:APP_URL+'/add_new_images',
            type:'POST',
            data:form_data,
            processData: false,  // tell jQuery not to process the data
            contentType: false,
            success:function (){
                GetGallery(gallery_id);
            }
        })
    }


   function GetGallery(gallery_id){
        $('#GalleryInput').val(gallery_id);
        $('#galleries .active').removeClass('active');
        $('#gallery_'+gallery_id).addClass('active');
        $('.has_gallery').each(function (){
            let defaultVal  = $(this).attr('data-val');
            $(this).html(defaultVal+' - '+$('#gallery_'+gallery_id).attr('data-val'));
        })
        $('#gallery_images').html('');
            $.ajax({
            url: 'http://127.0.0.1:8000/%2FGetImages',
            type:'GET',
            data:{gallery_id:gallery_id},
            success:function (response){
                HandleImages(JSON.parse(response));
            }
        })
   }

   function HandleImages(response) {
        $.each(response , function (key , value){

           let gallery_images = $('#gallery_images');
           let image = '<div data-bs-toggle="modal" data-bs-target="#image-modal" id ="image_'+value.id+'" class="col-lg-3 col-md-4 col-xs-6 thumb">\n' +
                '                <a href="#" class="image" rel="ligthbox">\n' +
                '                    <img  src="'+MEDIA_URL+value.image+'" class="zoom img-fluid "  alt="">\n' +
                '\n' +
                '                </a>\n' +
                '</div>';

           gallery_images.prepend(image);
            $('#image_'+value.id).click(function () {
                $('#modal_content').html($(this).html());
            })
        });
   }