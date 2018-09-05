$(document).ready(function() {
    var api;
    var dashboard;
    var analytics;

    $.get('https://api.myjson.com/bins/1atfes', function(data) {
        
        var status = data.status;
        api = status.api;
        dashboard = status.dashboard;
        analytics = status.analytics;

        var api_container = $('div.flags.unscroll')[0];
        var dashboard_container = $('div.flags.unscroll')[1];
        var analytics_container = $('div.flags.unscroll')[2];

        for(var i=0; i<api.length; i++) {
            var element = $("<div class='flag-status has-tooltip'></div>");
            element.addClass('status-api-'+i);
            element.attr('data-type', 'api');
            element.attr('data-index', i);
            element.attr('data-date', api[i].date);
            element.attr('data-datelabel', moment(api[i].date, "YYYY-MM-DD").format('dddd Do MMM'))
            element.attr('data-uptime', api[i].uptime);

            switch(api[i].status) {
                case "operational":
                    element.addClass("operational");
                    element.attr('data-status', "operational");
                break;
                case "degraded_performance":
                    element.addClass("degraded-performance");
                    element.attr('data-status', "degraded-performance");
                break;
                case "major_outage":
                    element.addClass("major-outage");
                    element.attr('data-status', "major-outage");
                break;
            }

            api_container.append(element[0]);
        }

        for(var i=0; i<dashboard.length; i++) {
            var element = $("<div class='flag-status has-tooltip'></div>");
            element.addClass('status-dashboard-'+i);
            element.attr('data-type', 'dashboard');
            element.attr('data-index', i);
            element.attr('data-date', dashboard[i].date);
            element.attr('data-datelabel', moment(dashboard[i].date, "YYYY-MM-DD").format('dddd Do MMM'))
            element.attr('data-uptime', dashboard[i].uptime);

            switch(dashboard[i].status) {
                case "operational":
                    element.addClass("operational");
                    element.attr('data-status', "operational");
                break;
                case "degraded_performance":
                    element.addClass("degraded-performance");
                    element.attr('data-status', "degraded-performance");
                break;
                case "major_outage":
                    element.addClass("major-outage");
                    element.attr('data-status', "major-outage");
                break;
            }

            dashboard_container.append(element[0]);
        }

        for(var i=0; i<analytics.length; i++) {
            var element = $("<div class='flag-status has-tooltip'></div>");
            element.addClass('status-analytics-'+i);
            element.attr('data-type', 'analytics');
            element.attr('data-index', i);
            element.attr('data-date', analytics[i].date);
            element.attr('data-datelabel', moment(analytics[i].date, "YYYY-MM-DD").format('dddd Do MMM'))
            element.attr('data-uptime', analytics[i].uptime);

            switch(analytics[i].status) {
                case "operational":
                    element.addClass("operational");
                    element.attr('data-status', "operational");
                break;
                case "degraded_performance":
                    element.addClass("degraded-performance");
                    element.attr('data-status', "degraded-performance");
                break;
                case "major_outage":
                    element.addClass("major-outage");
                    element.attr('data-status', "major-outage");
                break;
            }

            analytics_container.append(element[0]);
        }


        $('.loader').find('div:first').remove();
        $('.loader').addClass('loaded');

        $('.flag-status').mouseover(function(e) {
            var element = e.target;
            var index = parseInt(element.dataset.index);
            var type = element.dataset.type;

            for(i=0; i<=4; i++) {
                if(i==0) {
                    $('.status-'+type+'-'+index).addClass('lens-0');
                    continue;
                }
                if($('.status-'+type+'-'+(index-i))) {
                    $('.status-'+type+'-'+(index-i)).addClass('lens-'+i);
                }
                if($('.status-'+type+'-'+(index+i))) {
                    $('.status-'+type+'-'+(index+i)).addClass('lens-'+i);
                }
            }

        });

        $('.flag-status').mouseout(function(e) {
            var element = e.target;
            var index = parseInt(element.dataset.index);
            var type = element.dataset.type;

            for(var i=-4; i<=4; i++) {
                var el = $('.status-'+type+'-'+(index+i));
                if(!el)
                    continue;
                el.removeClass(function(pos, classNames) {
                    var current_classes = classNames.split(" ");
                    var classes_to_remove = [];
                    
                    $.each(current_classes, function(pos, class_name) {
                        if(/lens-.*/.test(class_name)) {
                            classes_to_remove.push(class_name);   
                        }
                    });
                    
                    return classes_to_remove.join(" ");
                })
            }
        });

        $('div.flag-status.has-tooltip').each(function() {

            var element = $("<div class='status-tooltip text-center'><span class='date'>"+this.dataset.datelabel+".</span><br><span class='status-icon "+this.dataset.status+"'>"+this.dataset.uptime+"%</span></div>");
            
            new Tooltip($(this), {
                placement: 'top',
                html: true,
                title: element[0]
            })
        });

    });

    
});