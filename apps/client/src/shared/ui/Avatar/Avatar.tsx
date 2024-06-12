// import avatar from '@/shared/assets/images/default_avatar.jpg';

import classNames from 'classnames';

type AvatarProps = {
    className?: string;
    size?: number;
    src?: string;
    alt?: string;
};

export const Avatar = (props: AvatarProps) => {
    const { className, size = 100, src, alt } = props;

    const style = {
        width: size,
        height: size,
    };
    //
    // const FallbackError = (
    //     <Icon Svg={FallbackAvatar} width={size} height={size} />
    // );
    //
    // const FallbackLoading = (
    //     <Skeleton width={size} height={size} borderRadius={'50%'} />
    // );

    return (
        <figure className={classNames(['avatar avatar-nav', className])}>
            <img
                src={src}
                className="avatar rounded-circle"
                style={style}
                alt={alt}
            />
        </figure>
    );
};
