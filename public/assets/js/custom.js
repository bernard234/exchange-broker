function articleImage(e) {
    var a = new FormData;
    a.append("image", e), swal({
        text: "Image uploading. Please Wait! ...",
        button: !1
    }), console.log(e), fetch("/article-image", {
        method: "POST",
        body: a,
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    }).then(e => e.json()).then(e => {
        $("#summernote").summernote("insertImage", e)
    }).then(() => {
        swal({
            icon: "success",
            text: "Uploaded successfully"
        })
    }).catch(e => {
        swal({
            icon: "error",
            text: e
        })
    })
}
function ImageUpload(e,id) {
    var a = new FormData;
    a.append("image", e), swal({
        text: "Image uploading. Please Wait! ...",
        button: !1
    }),fetch("/uploadImage", {
        method: "POST",
        body: a,
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    }).then(e => e.json()).then(e => {
        $(id).summernote("insertImage", e)
    }).then(() => {
        swal({
            icon: "success",
            text: "Uploaded successfully"
        })
    }).catch(e => {
        swal({
            icon: "error",
            text: e
        })
    })
}
$(document).ready(function() {
    $(".alert").alert(), window.setTimeout(function() {
        $(".alert").alert("close")
    }, 9e3), $("#summernote").summernote(), $("#dataTable").DataTable(), $("#birthday input").datepicker({
        format: "yyyy-mm-dd"
    }), $image_crop = $(".image-preview").croppie({
        enableExif: !0,
        enforceBoundary: !1,
        enableOrientation: !0,
        viewport: {
            width: 200,
            height: 200,
            type: "square"
        },
        boundary: {
            width: 300,
            height: 300
        }
    }), $(" #avatarCrop ").change(function() {
        $("#avatar-holder").addClass("d-none"), $("#avatar-updater").removeClass("d-none");
        var e = new FileReader;
        e.onload = function(e) {
            $image_crop.croppie("bind", {
                url: e.target.result
            })
        }, e.readAsDataURL(this.files[0])
    }), $("#toggleClose").click(function() {
        $("#toggleClose").css("display", "none"), $(".app-logo").css("display", "none"), $(".toggleopen").css("display", "block")
    }), $(".toggleopen").click(function() {
        $(".toggleopen").css("display", "none"), $(".app-logo").css("display", "block"), $("#toggleClose").css("display", "block")
    }), $("#rotate-image").click(function(e) {
        $image_crop.croppie("rotate", 90)
    }), $("#crop_image").click(function() {
        $image_crop.croppie("result", {
            type: "canvas",
            size: "viewport"
        }).then(function(e) {
            var a = $("input[name=avatar-url]").val(),
                t = $('meta[name="csrf-token"]').attr("content"),
                o = $("#crop_image");
            o.html("Saving Avatar..."), o.attr("disabled", "disabled"), $.ajaxSetup({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                }
            }), $.ajax({
                url: a,
                type: "POST",
                data: {
                    avatar: e,
                    _token: t
                },
                dataType: "json",
                success: function(e) {},
                complete: function(e) {
                    swal({
                        text: e.responseText,
                        icon: "success"
                    }).then(() => {
                        location.reload()
                    })
                }
            })
        })
    }), $("#avatar-cancel-btn").click(function() {
        $("#avatar-holder").removeClass("d-none"), $("#avatar-updater").addClass("d-none")
    });
    $("#backup-file-btn").click(function() {
        swal({
            text: "Application file backup is disabled by Administrator",
            icon: 'error',
        });
    });
    $("#backup-database-btn").click(function() {
        swal({
            text: "Database backup is disabled by Administrator",
            icon: 'error',
        });
    });

    $('#wdmethods').change(function(){
      $(this).find("option:selected").each(function(){
          var optionValue = $(this).attr("value");
          if(optionValue){
              $(".payment-meth").not("." + optionValue).hide();
              $("." + optionValue).show();
          } else{
              $(".payment-meth").hide();
          }
      });
    }).change();
});
$("#summernote").summernote({
    toolbar: [
        ["style", ["style"]],
        ["font", ["bold", "underline", "clear"]],
        ["color", ["color"]],
        ["para", ["ul", "ol", "paragraph"]],
        ["insert", ["link", "picture", "video"]],
        ["view", ["codeview"]]
    ],
    height: 300,
    minHeight: null,
    maxHeight: null,
    focus: 0,
    spellCheck: !0,
    callbacks: {
        onImageUpload: function(e) {
          articleImage(e[0])
        },
        onImageLinkInsert: function(e) {
            $("#summernote").summernote("insertImage", e)
        }
    }
});
$("#payment-method").summernote({
    toolbar: [
      ["font", ["bold","clear"]],
      ["para", ["ul", "ol", "paragraph"]],
      ["insert", ["link", "picture", "video"]]
    ],
    height: 300,
    minHeight: 300,
    maxHeight: 300,
    focus: 0,
    spellCheck: !0,
    callbacks: {
        onImageUpload: function(e) {
            ImageUpload(e[0],'#payment-method')
        },
        onImageLinkInsert: function(e) {
            $("#payment-method").summernote("insertImage", e)
        }
    }
});
$("#plan-description").summernote({
    toolbar: [
      ["font", ["bold","clear"]],
      ["para", ["ul", "ol", "paragraph"]],
    ],
    height: 200,
    minHeight: 200,
    maxHeight: 200,
    focus: 0,
    spellCheck: !0,
    callbacks: {
        onImageUpload: function(e) {
            ImageUpload(e[0],"#plan-description")
        },
        onImageLinkInsert: function(e) {
            $("#plan-description").summernote("insertImage", e)
        }
    }
});
$("#support").summernote({
    toolbar: [
      ["font", ["bold","clear"]],
      ["para", ["ul", "ol", "paragraph"]],
    ],
    height: 200,
    minHeight: 200,
    maxHeight: 200,
    focus: 0,
    spellCheck: !0,
});
$("#mail").summernote({
    toolbar: [
      ["font", ["bold","clear"]],
      ["para", ["ul", "ol", "paragraph"]],
    ],
    height: 200,
    minHeight: 200,
    maxHeight: 200,
    focus: 0,
    spellCheck: !0,
});

$(function() {
    $('[data-toggle="tooltip"]').tooltip()
});
