const { supabase } = require("../config/supabase")

class NotificationService {
    async getNotification(binId) {
        try {
            const { data, error } = await supabase.from("notifications").select("*").eq("bin_id", binId).order("created_at", {ascending: false})

            if (error) {
                console.log("Get Notification error:", error);
                throw error;
            }

            return data
        } catch (error) {
            console.log(error)
        }
    }

    async readNotification(notificationId) {
        try {
            const { data, error } = await supabase.from("notifications").select("*").eq("id", notificationId).single()

            if (error) {
                throw error;
            }

            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new NotificationService();