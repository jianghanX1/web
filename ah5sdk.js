var ah5sdk;
(function(ah5sdk) {
		const platformConfig = {
                "domain": "ah5game.com",
                "channel": "ah5game",
                "skin": 0,
                "google_client_id": "9846530703102193",
                "google_ad_channel": "2747364835",
                "google_ad_frequency_hint": "45s",
                "google_gtag_id": "UA-142750015-1",
                "google_gtm_id": "GTM-NM9GW5J",
                "google_verification_id": "",
                "google_ads_slot_1": "",
                "google_ads_slot_2": "",
                "google_ads_slot_3": "",
                "google_ads_version": 1
        };
		let adBreak = null
		let adConfig = null
		function init_newAfg_config() {
			
			const script = document.createElement('script');
			script.setAttribute('async', true);
			platformConfig.google_ad_frequency_hint && script.setAttribute('data-ad-frequency-hint', platformConfig.google_ad_frequency_hint)
			platformConfig.google_ad_channel && script.setAttribute('data-ad-channel', platformConfig.google_ad_channel)
			if (platformConfig.google_ads_version == 0) {
				script.setAttribute('data-ad-client', 'ca-pub-' + platformConfig.google_client_id);
				script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
			} else {
				script.setAttribute('crossorigin', 'anonymous');
				script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-' + platformConfig.google_client_id;
			}
			document.getElementsByTagName('head')[0].appendChild(script);
			
			window.adsbygoogle = window.adsbygoogle || [];
			adBreak =  adConfig = function(o) {adsbygoogle.push(o);}
			adConfig({
				preloadAdBreaks: 'on',
				sound: 'off',
			});
			
		}
		init_newAfg_config();
		
		function show_newAfg_preroll(_callback) {
			adBreak({
				type: 'preroll',  // ad shows at start of next level
				name: 'app_start',
				adBreakDone: () => {}, // Always called (if provided) even if an ad didn’t show
			});
		}
		ah5sdk.show_newAfg_preroll = show_newAfg_preroll;
		
		function show_newAfg_ad({ type, name, retry = true, done}) {
			// PlacementAd.lastLoadTime = Date.now();
			adBreak({
				type: type,
				name: name,
				beforeAd: function () {
					console.log("showAd beforeAd");
				},
				afterAd: function () {
					console.log("showAd afterAd");
				},
				adBreakDone: function (placementInfo) {
					console.log("adBreakDone => " + JSON.stringify(placementInfo));
					if (placementInfo && placementInfo.breakStatus == "viewed") {
						done && done(true);
					} else {
						done && done(false);
					}
				}
			});
		}
		ah5sdk.show_newAfg_ad = show_newAfg_ad;

		function show_newAfg_rewardAd({name= "getReward", after ,done}) {
			// PlacementAd.lastLoadTime = Date.now();
			adBreak({
				type: "reward",
				name: name,
				beforeReward: function (showAdFn) {
						console.log("showReward => beforeReward");
						showAdFn();
						// after && after(showAdFn);
				},
				adDismissed: () => {},
				adViewed: () => {},
				adBreakDone: function (placementInfo) {
					console.log("adBreakDone => " + JSON.stringify(placementInfo));
					if (placementInfo) {
						const fail = ('viewed' != placementInfo.breakStatus);
						if (!fail) {
							done(true);
						} else {
							done(false);
						}
					} else {
						done(false);
					}
				}
			});
		}
		ah5sdk.show_newAfg_rewardAd = show_newAfg_rewardAd;
	
	}
)(ah5sdk || (ah5sdk = {}));
export function show_newAfg_preroll() {
	return ah5sdk
}
