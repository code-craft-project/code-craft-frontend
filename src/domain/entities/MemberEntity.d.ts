type MemberRole = 'admin' | 'events_manager' | 'challenges_manager' | 'job_posts_manager';

interface MemberEntity {
    id?: number;
    user_id: number;
    user?: UserEntity;
    role: MemberRole;
    organization_id: number;
    created_at?: timestamp;
};