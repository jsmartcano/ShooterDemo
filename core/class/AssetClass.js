function AssetClass() {
	var _three = null;
	var _type = null;
	var _mesh = null;
	var _position = new THREE.Vector3(0,0,0);
	var _rotationQ = new THREE.Quaternion(0,0,0,1);
	var _track = null;

	return {
		three: _three,
		type: _type,
		mesh: _mesh,
		position: _position,
        rotationQ: _rotationQ,		
		track: _track
	};
}

function TrackClass() {
    var _frames = new Array();
    var _currentFrame = 0;

    function _getCurrentFrame() {
        return _frames[_currentFrame];
    };

    return {
        frames: _frames,
        currentFrame: _currentFrame,
        getCurrentFrame: _getCurrentFrame
    };
}

function FrameClass() {
    var _index = 0;
    var _position = new THREE.Vector3(0,0,0);
    var _rotationQ = new THREE.Quaternion(0, 0, 0, 1);

    return {
        index: _index,
        position: _position,
        rotationQ: _rotationQ
    };
}

