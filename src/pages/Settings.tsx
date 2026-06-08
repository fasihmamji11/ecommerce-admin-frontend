import { useState } from "react";
import "../styles/Settings.css";

export default function Settings() {
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div className="settings-page">
            <div className="settings-header">
                <h1>Settings</h1>
                <p>Manage your account information and preferences</p>
            </div>

            {/* Profile Section */}
            <div className="settings-card">
                <h2 className="card-title">Profile Information</h2>

                <div className="profile-section">
                    <div className="profile-image-wrapper">
                        <img
                            src={profileImage || "/default-profile.png"}
                            alt="Profile"
                            className="profile-image"
                        />
                        <label className="upload-btn">
                            Change Photo
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </label>
                    </div>

                    <div className="profile-fields">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" placeholder="Admin Name" />
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" placeholder="admin@example.com" />
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="text" placeholder="+123 456 789" />
                        </div>

                        <div className="form-group">
                            <label>Country</label>
                            <input type="text" placeholder="Country" />
                        </div>

                        <div className="form-group">
                            <label>City</label>
                            <input type="text" placeholder="City" />
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <textarea placeholder="Address"></textarea>
                        </div>
                    </div>
                </div>

                <div className="button-row">
                    <button className="btn-save">Save Changes</button>
                    <button className="btn-reset">Reset</button>
                </div>
            </div>

            {/* Password Section */}
            <div className="settings-card">
                <h2 className="card-title">Security</h2>

                <div className="password-section">
                    <div className="form-group">
                        <label>Current Password</label>
                        <input type="password" placeholder="Enter current password" />
                    </div>

                    <div className="form-group">
                        <label>New Password</label>
                        <input type="password" placeholder="Enter new password" />
                    </div>

                    <div className="form-group">
                        <label>Confirm New Password</label>
                        <input type="password" placeholder="Confirm new password" />
                    </div>
                </div>

                <div className="button-row">
                    <button className="btn-save">Update Password</button>
                </div>
            </div>

            {/* Notification Preferences */}
            <div className="settings-card">
                <h2 className="card-title">Notifications</h2>

                <div className="notification-group">
                    <label>
                        <input type="checkbox" />
                        Receive Order Alerts
                    </label>

                    <label>
                        <input type="checkbox" />
                        Receive Customer Messages
                    </label>

                    <label>
                        <input type="checkbox" />
                        Receive System Updates
                    </label>
                </div>

                <div className="button-row">
                    <button className="btn-save">Save Preferences</button>
                </div>
            </div>
        </div>
    );
}
