
$(function(){
    $('.datePicker').datepicker({dateFormat: 'yy-mm-dd'});
    $('.tokenField').tokenfield();
    var dT = $('.dataTable').DataTable({
        "lengthMenu": [[10, 50, 100, -1], [10, 50, 100, "All"]],
        "footerCallback": function( tfoot, data, start, end, display ) {
            var api = this.api();

            api.columns('.numCol', { page: 'current'}).every( function () {
                var sum = this
                    .data()
                    .reduce( function (a,b) {
                        if(a == "N/C"){
                            a = 0;
                        }else{
                            a = parseFloat(a);                           
                        }
                        if(b == "N/C"){
                            b = 0;
                        }else{
                            b = parseFloat(b);                            
                        }
                        var res = a+b;
                        return res.toFixed(2);
                    } );
             
                $( this.footer() ).html(sum);
            });
        }
    });
});