var webh5sdk;
(function(webh5sdk) {
		const platformConfig = {
                "google_client_id": "9846530703102193",
                "google_ad_channel": "2747364835",
                "google_ad_frequency_hint": "45s",
                "google_ads_slot_1": "",
                "google_ads_slot_2": "",
                "google_ads_slot_3": ""
        };
		let adBreak = null
		let adConfig = null
		function init_newAfg_config() {
			
			const script = document.createElement('script');
			script.setAttribute('async', true);
			platformConfig.google_ad_frequency_hint && script.setAttribute('data-ad-frequency-hint', platformConfig.google_ad_frequency_hint)
			platformConfig.google_ad_channel && script.setAttribute('data-ad-channel', platformConfig.google_ad_channel)

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
		webh5sdk.show_newAfg_preroll = show_newAfg_preroll;
		
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
		webh5sdk.show_newAfg_ad = show_newAfg_ad;

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
		webh5sdk.show_newAfg_rewardAd = show_newAfg_rewardAd;
	
	}
)(webh5sdk || (webh5sdk = {}));
export function show_newAfg_preroll() {
	return webh5sdk
}
