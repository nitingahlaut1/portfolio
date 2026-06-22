"use client";

export default function Profile({
    username,
}: {
    username: string;
}) {

    return (
        <div>
            <h1>User Profile</h1>

            {/* ❌ Vulnerability: XSS */}
            <div
                dangerouslySetInnerHTML={{
                    __html: username,
                }}
            />
        </div>
    );
}