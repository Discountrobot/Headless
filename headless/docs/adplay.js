function initializePlayer() {
    flowplayer("player", {
        src: "/Scripts/flowplayer.commercial-3.2.16.swf",
        wmode: "transparent"
    }, {
        initPlay: !1,
        ended: !1,
        key: "#$e6dbfd972303cc288ca",
        plugins: {
            controls: {
                play: !1,
                volume: !1,
                mute: !1,
                time: !0,
                stop: !1,
                playlist: !1,
                fullscreen: !1,
                scrubber: !1
            }
        },
        play: {
            url: "/Content/themes/default/images/play-bt.png",
            width: 240,
            height: 94
        },
        canvas: {
            backgroundColor: "transparent",
            backgroundGradient: "none"
        },
        screen: {
            width: "1px",
            height: "1px"
        },
        onBeforeKeyPress: function () {
            return !1
        },
        onLoad: function () {
            autoplay ? (enterFullwindowPlayer(), requestAd()) : resetPlayer()
        },
        onBegin: function () {},
        onBufferFull: function () {
            clearInterval(loadingProgressIntervalHandle), this.initPlay || this.pause()
        },
        onBeforeResume: function () {
            this.isFullscreen() || this.toggleFullscreen()
        },
        onResume: function (n) {
            this.isFullscreen() ? n.isLoadingVideo ? this.ended || requestAd() : this.initPlay = !0 : (this.initPlay = !1, this.pause())
        },
        onPause: function () {},
        onFullscreen: function () {
            this.getControls().show(), browserType.get() !== browserType.FirefoxOnMac && ($(overlaySelector).show(), $(overlaySelector).height($(document).height())), replayScreen = !1
        },
        onFullscreenExit: function () {
            this.pause(), this.getControls().hide(), this.getClip().isLoadingVideo ? resetPlayer() : (enterFullwindowPlayer(), $f().getPlay().hide(), this.initPlay && !this.ended ? endSession(sessionStatus.interrupted) : this.initPlay && this.ended && showVideoEndedDialog())
        },
        onFinish: function (n) {
            n.isLoadingVideo ? this.play() : (this.ended = !0, this.isFullscreen() && (this.toggleFullscreen(), this.play(), this.pause()), showVideoEndedDialog(), startResponseTimer())
        },
        onClipAdd: function (n) {
            this.setClip(n)
        },
        onError: function (n, t) {
            alert("Error loading video."), window.console && console.log(t)
        }
    })
}
function requestAd() {
    abm = new AdBlockManager(function (n) {
        if (n) {
            var t = {
                url: abm.getCampaignMediaUrl(),
                bufferLength: 7,
                autoBuffering: !0,
                autoPlay: !1,
                isLoadingVideo: !1
            },
                i = Math.round(abm.getCampaignMediaDuration() * abm.getIsViewedPercentage() / 100) * 1e3;
            $f().onCuepoint([i], function () {
                abm.updateCampaignIsViewed(!0), updateTracking(), campaignViewed = !0
            });
            playAd(t), startMasterTimer()
        } else $f().isFullscreen() && $f().toggleFullscreen(), alert($("#hdnNoAdAvailable").val()), exitFullwindowPlayer(), resetPlayer()
    }, function (n) {
        window.console && console.log(n), $f().isFullscreen() && $f().toggleFullscreen(), alert($("#hdnUnexpectedErrorInAdPlay").val()), window.location.reload()
    })
}
function playAd(n) {
    $f().isFullscreen() ? ($f().play(n), $f().initPlay = !0, abm.updateStartTime()) : isFullWindowPlayer() ? ($f().addClip(n), $f().startBuffering()) : cancelSession()
}
function resetPlayer() {
    var n = window.location.href.indexOf("https") >= 0 ? "https:" : "http:",
        t = {
            url: n + $(hdnLoadingVideoUrlSelector).val(),
            bufferLength: 3,
            autoBuffering: !0,
            autoPlay: !1,
            isLoadingVideo: !0
        };
    $f().initPlay = !1, $f().ended = !1, $f().getControls().hide(), $f().addClip(t), $f().startBuffering(), resetDialogs(), $(overlaySelector).hide(), adsAvailable ? showPlayer() : hidePlayer()
}
function resetDialogs() {
    try {
        videoEndedDialog.resetVisitWebsiteAfterSession(), rateDialog.reset(), captchaDialog.reset()
    } catch (n) {}
}
function enterFullwindowPlayer() {
    window.scrollTo(0, 0), $("body").css("overflow", "hidden"), $(".balance-dashboard-center").css("position", "static"), $(playerSelector).addClass("fullwindow"), $f().getScreen().hide(), $f().getScreen().css("width", "100%"), $f().getScreen().css("height", "100%"), $f().getScreen().show()
}
function exitFullwindowPlayer() {
    $("body").css("overflow", "auto"), $(".balance-dashboard-center").css("position", "relative"), $(playerSelector).removeClass("fullwindow"), $(playerSelector).css("height", "100%"), $f().getScreen().hide(), $f().getScreen().css("width", "1px"), $f().getScreen().css("height", "1px"), $f().getScreen().css("top", "50%"), $f().getScreen().show(), $f().getPlay().show(), autoplay = !1, abm = null, $(overlaySelector).hide()
}
function isFullWindowPlayer() {
    return $(playerSelector).hasClass("fullwindow")
}
function hidePlayer() {
    $(playerSelector).hide()
}
function showPlayer() {
    $(playerSelector).show()
}
function updateAdStatusInfo() {
    try {
        $("#spnWatchedAds").html(parseInt($("#spnWatchedAds").html()) + 1), parseInt($("#spnWatchedAds").html()) == parseInt($("#spnTotalAds").html()) && (adsAvailable = !1)
    } catch (n) {}
}
function endSession(n, t) {
    clearTimers(), $f().isPlaying() && ($f().stop(), $f().toggleFullscreen()), n == sessionStatus.completed && verifyCampaignIsViewed(), abm.updateStatus(n), abm.postAdBlock(function (n) {
        if (n.Completed) {
            if (showSessionEndedDialog(!0, n.EarningString), updateAdStatusInfo(), abm.isFirstAd()) try {
                UserEmailVerification()
            } catch (t) {}
        } else showSessionEndedDialog(!1, n.EarningString), window.console && console.log("Exception: " + n.Exception)
    }, function (n) {
        window.console && console.log(n), alert($("#hdnUnexpectedErrorInOnUpdate").val()), closeAllDialogs(), $(overlaySelector).hide(), t && t.adPost_Failed && t.adPost_Failed()
    }), t && t.adPost_Begin && t.adPost_Begin()
}
function cancelSession() {
    abm && (abm.updateStatus(sessionStatus.cancelled), abm.postAdBlock(), abm = null), exitFullwindowPlayer(), resetPlayer()
}
function startMasterTimer() {
    abm && (masterTimer = setTimeout("endSession(sessionStatus.timedOut);", getMasterTimeoutTime(abm.getRequestTime(), abm.getMasterTimeout())))
}
function startResponseTimer() {
    if (!responseTimer) {
        var n = abm.getResponseTimeout() * 1e3,
            t = abm.getResponseTimeoutCountdownTime() * 1e3;
        countdownDialogTimer = setTimeout("showTimeoutDialog();", n - t), responseTimer = setTimeout("endSession(sessionStatus.timedOut);", n), $(timeoutDialogSelector).find("#" + responseTimeoutDialog.countdownContainerId).html(t / 1e3)
    }
}
function getMasterTimeoutTime(n, t) {
    var i, r = +new Date,
        u = Date.parse(n);
    return i = t * 1e3 - (r - u), i && i != NaN || (i = t * 1e3), i
}
function timeoutCountdown() {
    var n = parseInt($(timeoutDialogSelector).find("#" + responseTimeoutDialog.countdownContainerId).html()) - 1;
    $(timeoutDialogSelector).find("#" + responseTimeoutDialog.countdownContainerId).html(Math.max(n, 0))
}
function clearTimers() {
    try {
        clearTimeout(countdownDialogTimer), clearTimeout(responseTimer), clearTimeout(masterTimer), clearInterval(countdownIntervalHandle), responseTimer = null
    } catch (n) {}
}
function closeAllDialogs() {
    $(".adplay-popup-dialogue").hide()
}
function openDialog(n) {
    closeAllDialogs(), $(n).show()
}
function showTimeoutDialog() {
    initTimeoutDialog(), openDialog(timeoutDialogSelector), countdownIntervalHandle = setInterval("timeoutCountdown();", 1e3)
}
function showVideoEndedDialog() {
    $(videoEndedDialogSelector).find(".popup").length == 0 ? getPartialView("/Home/GetVideoEndedView", null, function (n) {
        $(videoEndedDialogSelector).html(n), initVideoEndedDialog(), openDialog(videoEndedDialogSelector)
    }) : (initVideoEndedDialog(), openDialog(videoEndedDialogSelector))
}
function showRateDialog() {
    $(rateDialogSelector).find(".popup").length == 0 ? getPartialView("/Home/GetRateView", null, function (n) {
        $(rateDialogSelector).html(n), initRateDialog(), openDialog(rateDialogSelector)
    }) : (initRateDialog(), openDialog(rateDialogSelector))
}
function showShareDialog() {
    $(shareDialogSelector).find(".popup").length == 0 ? getPartialView("/Home/GetShareView", null, function (n) {
        $(shareDialogSelector).html(n), initShareDialog(), openDialog(shareDialogSelector)
    }) : (initShareDialog(), openDialog(shareDialogSelector))
}
function showShareViaFacebookDialog() {
    $(shareViaFacebookDialogSelector).find(".popup").length == 0 ? getPartialView("/SocialMedia/GetShareViaFacebookView", null, function (n) {
        $(shareViaFacebookDialogSelector).html(n), initShareFacebookDialog(), openDialog(shareViaFacebookDialogSelector)
    }) : (initShareFacebookDialog(), openDialog(shareViaFacebookDialogSelector))
}
function showShareViaTwitterDialog() {
    $(shareViaTwitterDialogSelector).find(".popup").length == 0 ? getPartialView("/SocialMedia/GetShareViaTwitterView", null, function (n) {
        $(shareViaTwitterDialogSelector).html(n), initShareTwitterDialog(), openDialog(shareViaTwitterDialogSelector)
    }) : (initShareTwitterDialog(), openDialog(shareViaTwitterDialogSelector))
}
function showShareViaEmailDialog() {
    $(shareViaEmailDialogSelector).find(".popup").length == 0 ? getPartialView("/Home/GetShareViaEmailView", null, function (n) {
        $(shareViaEmailDialogSelector).html(n), shareMailDialog.initialize(abm.getAdBlockId()), initShareMailDialog(), openDialog(shareViaEmailDialogSelector)
    }) : (shareMailDialog.initialize(abm.getAdBlockId()), initShareMailDialog(), openDialog(shareViaEmailDialogSelector)), $(".green-bt").focus()
}
function showSessionEndedDialog(n, t) {
    var i = {
        sessionCompleted: n
    };
    getPartialView("/Home/GetSessionEndedView", i, function (n) {
        $(sessionEndedDialogSelector).html(n), initSessionEndedDialog(t), openDialog(sessionEndedDialogSelector)
    })
}
function showCaptchaDialog() {
    $(captchaDialogSelector).find(".popup").length == 0 ? getPartialView("/Home/GetCaptchaView", null, function (n) {
        $(captchaDialogSelector).html(n), initCaptchaDialog(), openDialog(captchaDialogSelector)
    }) : (initCaptchaDialog(), openDialog(captchaDialogSelector))
}
function initVideoEndedDialog() {
    var n = abm.isCampaignRatingAvailable(),
        t = abm.isCampaignSharingEnabled(),
        i = abm.getCampaignWebLink().trim() !== "";
    abm.getVisitWebsiteFlag() ? videoEndedDialog.setVisitWebsiteAfterSession() : videoEndedDialog.resetVisitWebsiteAfterSession(), videoEndedDialog.initialize(n, t, i), videoEndedDialog.webLinkClick = function () {
        clearTimeout(countdownDialogTimer), clearTimeout(responseTimer), abm.getCampaignWebLink().trim() !== "" && (abm.toggleVisitWebsiteFlag(), abm.getVisitWebsiteFlag() ? videoEndedDialog.setVisitWebsiteAfterSession() : videoEndedDialog.resetVisitWebsiteAfterSession())
    }, videoEndedDialog.rateClick = function () {
        return abm.isCampaignRatingAvailable() && showRateDialog(), clearTimeout(countdownDialogTimer), clearTimeout(responseTimer), !1
    }, videoEndedDialog.nextClick = function () {
        clearTimeout(countdownDialogTimer), clearTimeout(responseTimer), clearTimeout(masterTimer), abm.displayCaptcha() ? showCaptchaDialog() : endSession(sessionStatus.completed, videoEndedDialog)
    }, videoEndedDialog.shareClick = function () {
        clearTimeout(countdownDialogTimer), clearTimeout(responseTimer), abm.isCampaignSharingEnabled() && showShareDialog()
    }, videoEndedDialog.replayClick == null && (videoEndedDialog.replayClick = function () {
        clearTimeout(countdownDialogTimer), clearTimeout(responseTimer), $f().stop(), $f().play(), $f().pause(), replayScreen = !0, closeAllDialogs(), $f().getPlay().show()
    })
}
function initRateDialog() {
    rateDialog.nextClick == null && (rateDialog.nextClick = function () {
        showVideoEndedDialog(), abm.rateAd(rateDialog.getStars(), rateDialog.getSelectedOptions(), rateDialog.getComments())
    })
}
function initShareDialog() {
    adPlayShareDialog.closeClick == null && (adPlayShareDialog.closeClick = function () {
        showVideoEndedDialog()
    }), adPlayShareDialog.shareViaFacebookClick == null && (adPlayShareDialog.shareViaFacebookClick = function () {
        initShareFacebookDialog(), showFacebookDialog("", !0)
    }), adPlayShareDialog.shareViaTwitterClick == null && (adPlayShareDialog.shareViaTwitterClick = function () {
        initShareTwitterDialog(), showTwitterDialog("", !0)
    }), adPlayShareDialog.shareViaEmailClick == null && (adPlayShareDialog.shareViaEmailClick = function () {
        showShareViaEmailDialog()
    })
}
function initShareFacebookDialog() {
    facebookShareView.closeClick = function () {
        ClosefacebookShareView(), openDialog(shareDialogSelector)
    }, facebookShareView.shareSuccess = function () {
        ClosefacebookShareView(), showVideoEndedDialog()
    }
}
function initShareTwitterDialog() {
    twitterShareView.closeClick = function () {
        ClosetwitterShareView(), openDialog(shareDialogSelector)
    }, twitterShareView.shareSuccess = function () {
        ClosetwitterShareView(), showVideoEndedDialog()
    }
}
function initShareMailDialog() {
    shareMailDialog.closeClick == null && (shareMailDialog.closeClick = function () {
        showShareDialog()
    }), shareMailDialog.onEmailSent == null && (shareMailDialog.onEmailSent = function () {
        showVideoEndedDialog()
    })
}
function initSessionEndedDialog(n) {
    sessionEndedDialog.initialize(n), sessionEndedDialog.doneClick == null && (sessionEndedDialog.doneClick = function () {
        abm.getVisitWebsiteFlag() && $.trim(abm.getCampaignWebLink()) != "" && (setEovendoTrackingCookie(), window.open(abm.getCampaignWebLink(), "_blank")), $("#hdnIsUserProfileComplete").val().toLowerCase() == "false" ? window.location.href = sessionEndRediectPath : (exitFullwindowPlayer(), resetPlayer(), closeAllDialogs(), window.adPlayCompleted && window.adPlayCompleted())
    })
}
function initTimeoutDialog() {
    responseTimeoutDialog.backClick == null && (responseTimeoutDialog.backClick = function () {
        clearTimeout(responseTimer), clearInterval(countdownIntervalHandle), showVideoEndedDialog()
    })
}
function initCaptchaDialog() {
    captchaDialog.onValidated == null && (captchaDialog.onValidated = function () {
        endSession(sessionStatus.completed, captchaDialog)
    })
}
function getPartialView(n, t, i, r) {
    $.get(n, t).done(function (n) {
        i(n)
    }).fail(function (n, t, i) {
        r && r(i)
    })
}
function verifyCampaignIsViewed() {
    try {
        campaignViewed == !1 && (abm.updateCampaignIsViewed(!0), updateTracking(), campaignViewed = !0)
    } catch (n) {}
}
function updateTracking() {
    var n = abm.getCampaignImpressionLink();
    n && n.trim() != "" && $(iframTrackingSelector).attr("src", n)
}
function setEovendoTrackingCookie() {
    try {
        document.cookie = "eovendotracking=true; domain=.eovendo.com;"
    } catch (n) {}
}
function checkAdStatus() {
    window.console && console.log("[" + (new Date).toLocaleTimeString() + "] Checking ad status..."), $.ajax({
        type: "GET",
        url: "/Home/GetUserAdInfo",
        dataType: "json"
    }).done(function (n) {
        window.console && console.log(n), n.TotalAds - n.WatchedAds > 0 && n.MatchingAdsAvailable ? (adsAvailable = !0, $(playerSelector).is(":hidden") && (showPlayer(), setStatusCheckInterval(statusCheckLongInterval))) : (adsAvailable = !1, $(playerSelector).is(":hidden") || (hidePlayer(), setStatusCheckInterval(statusCheckShortInterval))), $("#spnWatchedAds").html(n.WatchedAds), $("#spnTotalAds").html(n.TotalAds)
    }).fail(function (n) {
        window.console && console.log(n)
    })
}
function setStatusCheckInterval(n) {
    clearInterval(statusCheckIntervalHandler), statusCheckIntervalHandler = setInterval("checkAdStatus()", n)
}
function getUserAgent() {
    var n = navigator.userAgent.toLowerCase(),
        t = new RegExp("^(?=.*\\bmacintosh\\b)(?=.*\\bfirefox\\b).+", "gi");
    return t.test(n) ? browserType.FirefoxOnMac : browserType.unidentified
}
var AdBlockManager = function (n, t) {
        function r(n, t) {
            getAdBlock(function (t) {
                i = t, window.console && console.log(t), n(t != null && t != undefined)
            }, function (n) {
                t && t(n)
            })
        }
        var i;
        return getAdBlock = function (n, t) {
            $.ajax({
                type: "GET",
                url: "/api/adblockapi",
                dataType: "json"
            }).done(function (t) {
                n(t)
            }).fail(function (n) {
                t(n)
            })
        }, this.rateAd = function (n, t, r) {
            var f, u;
            if (i.Campaign.Rating) {
                for (f = [], u = 0; u < t.length; u++) f.push({
                    value: t[u]
                });
                i.Campaign.Rating.Stars = n, i.Campaign.Rating.SelectedOptions = f, i.Campaign.Rating.Comments = r
            }
        }, this.reportAd = function (n, t) {
            i.Campaign.Report.Reason = {
                value: n
            }, i.Campaign.Report.Comments = t
        }, this.postAdBlock = function (n, t) {
            window.console && console.log(i), $.ajax({
                type: "POST",
                url: "/api/adblockapi",
                data: JSON.stringify(i),
                contentType: "application/json",
                dataType: "json"
            }).done(function (t) {
                n && n(t)
            }).fail(function (n) {
                t && t(n)
            })
        }, this.getAdBlockId = function () {
            return i.Id
        }, this.getCampaignMediaUrl = function () {
            return i.Campaign.MediaUrl
        }, this.getCampaignMediaType = function () {
            return i.Campaign.MediaType
        }, this.getCampaignMediaDuration = function () {
            return i.Campaign.MediaDuration
        }, this.getCampaignWebLink = function () {
            return i.Campaign.WebLink
        }, this.getCampaignImpressionLink = function () {
            return i.Campaign.ImpressionLink
        }, this.getRequestTime = function () {
            return i.RequestTime
        }, this.getResponseTimeout = function () {
            return i.Settings.ResponseTimeout
        }, this.getResponseTimeoutCountdownTime = function () {
            return i.Settings.ResponseTimeoutCountdownTime
        }, this.getMasterTimeout = function () {
            return i.Settings.MasterTimeout
        }, this.getIsViewedPercentage = function () {
            return i.Settings.IsViewedPercentage
        }, this.getVisitWebsiteFlag = function () {
            return i.Campaign.WebLinkClicked
        }, this.isCampaignRatingAvailable = function () {
            return i.Campaign.Rating !== null && i.Campaign.Rating !== undefined
        }, this.isCampaignSharingEnabled = function () {
            return i.Campaign.SharingEnabled
        }, this.isFirstAd = function () {
            return i.Settings.IsFirst
        }, this.displayCaptcha = function () {
            return i.Settings.DisplayCaptcha
        }, this.updateCampaignIsViewed = function (n) {
            i.Campaign.IsViewed = n
        }, this.updateStatus = function (n) {
            i.AdStatus = {
                value: n
            }, i.EndTime = (new Date).toISOString()
        }, this.updateStartTime = function () {
            try {
                i.StartTime == null && i.Campaign.StartTime == null && (i.StartTime = i.Campaign.StartTime = (new Date).toISOString())
            } catch (n) {}
        }, this.updateCampaignEndTime = function () {
            try {
                i.Campaign.EndTime == null && (i.Campaign.EndTime = (new Date).toISOString())
            } catch (n) {}
        }, this.toggleVisitWebsiteFlag = function () {
            i.Campaign.WebLinkClicked = !i.Campaign.WebLinkClicked
        }, r(n, t)
    },
    abm, countdownIntervalHandle, responseTimer, countdownDialogTimer, masterTimer, adsAvailable = !0,
    campaignViewed = !1,
    replayScreen = !1,
    autoplay = !1,
    requiredFlashVersion = "10.1",
    playerSelector = "#player",
    overlaySelector = ".adplay-overlay",
    videoEndedDialogSelector = "#videoEndedDialog",
    rateDialogSelector = "#rateDialog",
    shareDialogSelector = "#shareDialog",
    shareViaFacebookDialogSelector = "#shareViaFacebookDialog",
    shareViaTwitterDialogSelector = "#shareViaTwitterDialog",
    shareViaEmailDialogSelector = "#shareViaEmailDialog",
    sessionEndedDialogSelector = "#sessionEndedDialog",
    timeoutDialogSelector = "#timeoutDialog",
    captchaDialogSelector = "#captchaDialog",
    hdnAdsAvailableSelector = "#hdnAdsAvailable",
    hdnLoadingVideoUrlSelector = "#hdnLoadingVideoUrl",
    iframTrackingSelector = "#ifrmScript",
    sessionStatus = {
        completed: "Completed",
        interrupted: "Interrupted",
        timedOut: "Timedout",
        cancelled: "Cancelled"
    },
    sessionEndRediectPath = "/UserData",
    homeRedirectPath = "/Home",
    statusCheckShortInterval, statusCheckLongInterval, statusCheckIntervalHandler, browserType;
$(function () {
    if (window.location.href.toLowerCase().indexOf("playad") >= 0 && (autoplay = !0, $(overlaySelector).show()), adsAvailable = $(hdnAdsAvailableSelector).val().toLowerCase() == "true", swfobject.hasFlashPlayerVersion(requiredFlashVersion)) initializePlayer();
    else {
        var n = $("#hdnRequriedFlashVersionNotFound").val().replace("{0}", requiredFlashVersion);
        alert(n);
        return
    }
    $(document).on("keydown", function (n) {
        n.keyCode == 27 && (replayScreen ? (showVideoEndedDialog(), replayScreen = !1, $f().getPlay().hide()) : autoplay && cancelSession())
    });
    setStatusCheckInterval(statusCheckLongInterval)
}), statusCheckShortInterval = 6e4, statusCheckLongInterval = 12e4, browserType = {
    FirefoxOnMac: "firefoxOnMac",
    unidentified: "unidentified",
    get: function () {
        return getUserAgent()
    }
}