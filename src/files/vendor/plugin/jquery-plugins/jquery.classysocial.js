/*!
 * jQuery ClassySocial
 * http://www.class.pm/projects/jquery/classysocial
 *
 * Copyright 2012 - 2013, Class.PM www.class.pm
 * Written by Marius Stanciu - Sergiu <marius@picozu.net>
 * Licensed under the GPL Version 3 license.
 * Version 1.1.0
 *
 */

ClassySocial = function(e) {
    var n = e, s = "bubble", o = "arc", u = 0, a = 180, f = 80, l = 70, c = "none", h = "picture";
    if ($(n).attr("data-networks")) {
        r = $(n).attr("data-networks").toLowerCase().split(",");
    }
    if ($(n).attr("data-orientation")) {
        o = $(n).attr("data-orientation").toLowerCase();
    }
    if ($(n).attr("data-arc-start")) {
        u = parseInt($(n).attr("data-arc-start"));
    }
    if ($(n).attr("data-arc-length")) {
        a = parseInt($(n).attr("data-arc-length"));
    }
    if ($(n).attr("data-radius")) {
        f = parseInt($(n).attr("data-radius"));
    }
    if ($(n).attr("data-gap")) {
        l = parseInt($(n).attr("data-gap"));
    }
    if ($(n).attr("data-picture")) {
        c = $(n).attr("data-picture");
    }
    if ($(n).attr("data-image-type")) {
        h = $(n).attr("data-image-type").toLowerCase();
    }
    var initialize = function() {
        $(n).addClass(s);
        var template = data[s];
        if (h === "facebook") {
            c = "https://graph.facebook.com/" + c + "/picture?type=large";
        }
        $(n).html(template["holder"].replace(/\[IMAGE_URL\]/gi, c));
        var e = $(n).find(".network_holder");
        for (var t = 0; t < r.length; t++) {
            var i = r[t], o = profiles[i], u;
            if (o["profile_url"] && $(n).attr("data-" + i + "-handle")) {
                u = o["profile_url"].replace(/\[HANDLE\]/gi, $(n).attr("data-" + i + "-handle"));
            }
            else {
                continue;
            }
            var a = template["network_button"].replace(/\[URL\]/gi, u).replace(/\[NAME\]/gi, o["name"]).replace(/\[NETWORK\]/gi, i), f = $(a);
            e.append(f);
        }
        if (bubbles[s]) {
            bubbles[s](template);
        }
    };
    var data = {
        bubble: {
            holder: '<a class="main" title="Find Me Here" alt="Find Me Here">' + '<img src="[IMAGE_URL]" title="Find Me Here" alt="Find Me Here"/>' + "</a>" + '<div class="network_holder"></div>',
            network_button: '<a class="network_button [NETWORK]" target="_blank" href="[URL]" data-network="[NETWORK]">[NAME]</a>',
            orientations: {
                arc: function() {
                    if ($(this).hasClass("disabled")) {
                        return;
                    }
                    var e = 250, t = 250, r = $(n).find(".network_button").length, i = e + (r - 1) * t, s = 0;
                    var o = $(this).outerWidth(), l = $(this).outerHeight();
                    var c = $(n).find(".network_button:eq(0)").outerWidth(), h = $(n).find(".network_button:eq(0)").outerHeight();
                    var p = (o - c) / 2, d = (l - h) / 2;
                    if (!$(this).hasClass("active")) {
                        $(this).addClass("disabled").delay(i).queue(function(e) {
                            $(this).removeClass("disabled").addClass("active");
                            e();
                        });
                        var v = a / r, m = u + v / 2;
                        $(n).find(".network_button").each(function() {
                            var n = m / 180 * Math.PI, r = p + f * Math.cos(n), i = d + f * Math.sin(n);
                            $(this).css({
                                display: "block",
                                left: p + "px",
                                top: d + "px"
                            }).stop().delay(t * s).animate({
                                left: r + "px",
                                top: i + "px"
                            }, e);
                            m += v;
                            s++;
                        });
                    }
                    else {
                        s = r - 1;
                        $(this).addClass("disabled").delay(i).queue(function(e) {
                            $(this).removeClass("disabled").removeClass("active");
                            e();
                        });
                        $(n).find(".network_button").each(function() {
                            $(this).stop().delay(t * s).animate({
                                left: p,
                                top: d
                            }, e);
                            s--;
                        });
                    }
                },
                line: function() {
                    if ($(this).hasClass("disabled")) {
                        return;
                    }
                    var e = 500, t = 250, r = $(n).find(".network_button").length, i = l, s = e + (r - 1) * t, o = 1;
                    var a = $(this).outerWidth(), f = $(this).outerHeight();
                    var c = $(n).find(".network_button:eq(0)").outerWidth(), h = $(n).find(".network_button:eq(0)").outerHeight();
                    var p = (a - c) / 2, d = (f - h) / 2, v = u / 180 * Math.PI;
                    if (!$(this).hasClass("active")) {
                        $(this).addClass("disabled").delay(s).queue(function(e) {
                            $(this).removeClass("disabled").addClass("active");
                            e();
                        });
                        $(n).find(".network_button").each(function() {
                            var n = p + (p + i * o) * Math.cos(v), r = d + (d + i * o) * Math.sin(v);
                            $(this).css({
                                display: "block",
                                left: p + "px",
                                top: d + "px"
                            }).stop().delay(t * o).animate({
                                left: n + "px",
                                top: r + "px"
                            }, e);
                            o++;
                        });
                    }
                    else {
                        o = r;
                        $(this).addClass("disabled").delay(s).queue(function(e) {
                            $(this).removeClass("disabled").removeClass("active");
                            e();
                        });
                        $(n).find(".network_button").each(function() {
                            $(this).stop().delay(t * o).animate({
                                left: p,
                                top: d
                            }, e);
                            o--;
                        });
                    }
                }
            }
        }
    };
    var bubbles = {
        bubble: function(e) {
            var t = e["orientations"]["arc"];
            if (e["orientations"][o]) {
                t = e["orientations"][o];
            }
            $(n).find(".main").click(t);
        }
    };
    var profiles = {
        facebook: {
            profile_url: "http://www.facebook.com/[HANDLE]",
            name: "Facebook"
        },
        google: {
            profile_url: "https://plus.google.com/[HANDLE]",
            name: "Google Plus"
        },
        twitter: {
            profile_url: "https://twitter.com/[HANDLE]",
            name: "Twitter"
        },
        pinterest: {
            profile_url: "http://pinterest.com/[HANDLE]",
            name: "Pinterest"
        },
        linkedin: {
            profile_url: "http://www.linkedin.com/profile/view?id=[HANDLE]",
            name: "LinkedIn"
        },
        dribbble: {
            profile_url: "http://dribbble.com/[HANDLE]",
            name: "Dribbble"
        },
        email: {
            profile_url: "mailto:[HANDLE]",
            name: "Email"
        },
        socl: {
            profile_url: "http://www.so.cl/#/profile/[HANDLE]",
            name: "Socl"
        },
        instagram: {
            profile_url: "http://instagram.com/[HANDLE]",
            name: "Instagram"
        },
        vimeo: {
            profile_url: "http://vimeo.com/[HANDLE]",
            name: "Vimeo"
        },
        youtube: {
            profile_url: "http://www.youtube.com/user/[HANDLE]",
            name: "YouTube"
        }
    };
    initialize();
};