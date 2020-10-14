// This file contains the fastlane.tools configuration
// You can find the documentation at https://docs.fastlane.tools
//
// For a list of all available actions, check out
//
//     https://docs.fastlane.tools/actions
//

import Foundation

class Fastfile: LaneFile {
	// func customLane() {
	//    desc("Description of what the lane does")
	// 	// add actions here: https://docs.fastlane.tools/actions
	// }
	// func testLane() {
    //     desc("This is a lane")
    // }

    func helper() {
        // This is not a lane but can be called from a lane
    }

    func deployLane(withOptions options:[String: String]?) {
        // ...
        if let submit = options?["submit"], submit == "true" {
            // Only when submit is true
        }
        // ...
        incrementBuildNumber(buildNumber: options?["build_number"])
        // ...
    }

	
// 	func betaLane() {
//     desc("Submit a new Beta Build to Apple TestFlight. This will also make sure the profile is up to date")

//     syncCodeSigning(gitUrl: "​https://github.com/punksta", appIdentifier: [appIdentifier], username: appleID)
//     // Build your app - more options available
//     buildIosApp(scheme: "SchemeName")
//     uploadToTestflight(username: appleID)
//     // You can also use other beta testing services here (run `fastlane actions`)
//    } 
}

