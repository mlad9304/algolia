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
            element.addClass('status-search-api-'+i);

            switch(api[i].status) {
                case "operational":
                    element.addClass("operational");
                break;
                case "degraded_performance":
                    element.addClass("degraded-performance");
                break;
                case "major_outage":
                    element.addClass("major-outage");
                break;
            }

            api_container.append(element[0]);
        }

        for(var i=0; i<dashboard.length; i++) {
            var element = $("<div class='flag-status has-tooltip'></div>");
            element.addClass('status-dashboard-'+i);

            switch(dashboard[i].status) {
                case "operational":
                    element.addClass("operational");
                break;
                case "degraded_performance":
                    element.addClass("degraded-performance");
                break;
                case "major_outage":
                    element.addClass("major-outage");
                break;
            }

            dashboard_container.append(element[0]);
        }

        for(var i=0; i<analytics.length; i++) {
            var element = $("<div class='flag-status has-tooltip'></div>");
            element.addClass('status-analytics-'+i);

            switch(analytics[i].status) {
                case "operational":
                    element.addClass("operational");
                break;
                case "degraded_performance":
                    element.addClass("degraded-performance");
                break;
                case "major_outage":
                    element.addClass("major-outage");
                break;
            }

            analytics_container.append(element[0]);
        }

    });
});